import os
import shutil
import uuid

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.docstore.document import Document
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

from docling.document_converter import DocumentConverter
from typing import List
from pathlib import Path
import requests

load_dotenv(dotenv_path="/Users/mac/Desktop/rdlab/backend/app/.env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  
GEMINI_API_URL = os.getenv("GEMINI_API_URL")  
BASE_DIR = "dataset"
VECTOR_DB_DIR = "vector_dbs"

os.makedirs(BASE_DIR, exist_ok=True)
os.makedirs(VECTOR_DB_DIR, exist_ok=True)

def parse_pdf_to_txt(file_path: str, output_dir: str) -> str:
    converter = DocumentConverter()
    filename = Path(file_path).stem
    txt_path = os.path.join(output_dir, f"{filename}.txt")
    
    try:
        result = converter.convert(file_path)

        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write("\n\nMarkdown Conversion:\n\n")
            f.write(result.document.export_to_markdown())
            f.write("\n\nMetadata (as Dict):\n\n")
            f.write(str(result.document.export_to_dict()))
        
        print(f"✅ Parsed and saved: {file_path} → {txt_path}")
        return txt_path

    except Exception as e:
        raise RuntimeError(f"❌ Failed to parse {file_path}: {e}")

def clean_text(text: str) -> str:
    lines = text.splitlines()
    lines = [line.strip() for line in lines if line.strip()]
    return "\n".join(lines)


def chunk_text(text: str) -> List[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=400
    )
    return splitter.split_text(text)


def get_or_create_vectorstore(category: str, docs: List[Document]) -> FAISS:
    store_path = os.path.join(VECTOR_DB_DIR, category)
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    if os.path.exists(store_path):
        db = FAISS.load_local(store_path, embedding_model, allow_dangerous_deserialization=True) # changed it 
        db.add_documents(docs)
    else:
        print(f"🔄 Creating embeddings for {len(docs)} documents...")

        # Use FAISS's optimized method to create embeddings directly
        db = FAISS.from_documents(docs, embedding_model)
        db.save_local(store_path)
        print(f"✅ Vectorstore saved at: {store_path}")

    return db


def ingest_file(file_path: str, category: str):
    """
    Ingests a PDF or its parsed .txt: parses if needed, cleans, chunks, embeds,
    and stores it in the appropriate FAISS vector store under the given category.
    """
    # Derive the .txt path from the .pdf path
    filename = Path(file_path).stem
    txt_path = os.path.join(os.path.dirname(file_path), f"{filename}.txt")

    # Parse the PDF if the .txt doesn't exist
    if not os.path.exists(txt_path):
        print(f"ℹ️  No parsed text found for {filename}. Parsing PDF now...")
        txt_path = parse_pdf_to_txt(file_path, os.path.dirname(file_path))

    # 1. Clean
    with open(txt_path, "r", encoding="utf-8") as f:
        raw_text = f.read()
        cleaned_text = clean_text(raw_text)

    # 2. Chunk
    chunks = chunk_text(cleaned_text)
    docs = [Document(page_content=chunk, metadata={"source": file_path}) for chunk in chunks]

    # 3. Vectorize
    get_or_create_vectorstore(category, docs)

    print(f"✅ {file_path} ingested and added to category '{category}'.")


# === Prompt Template ===
def get_custom_prompt() -> PromptTemplate:
    return PromptTemplate.from_template("""
        You are an expert assistant providing answers based STRICTLY and ONLY on the provided context.

        Your answer must be written in **Markdown format** to support readability, including:
        - Bullet points
        - Numbered lists (if needed)
        - Bold or italic formatting
        - Code blocks (if technical content)
        - Headings (for structure)

        Follow these rules:
        1. **Only use the provided context to answer the question**.
        2. **If the answer is not in the context**, say: "I don't have enough information from my knowledge base to answer that."
        3. **If the question is unrelated**, say: "This question is outside my knowledge scope."
        4. Be clear, concise, and well-structured.

        ------------------
        Context:
        {context}
        ------------------

        Question: {question}

        Expert Answer (in Markdown):
    """)


# === Call Gemini API directly ===
def query_gemini_model(context: str, question: str, api_key: str) -> str: 
    print("📡 Sending request to Gemini 2.0 Flash...")
    
    headers = {
        "Content-Type": "application/json"
    }

    # More strict instruction template
    instruction = """You are an expert assistant that STRICTLY answers ONLY based on the provided context.
                    Write your answers in **Markdown** for readability.

                    Include:
                    - Bullet points
                    - Numbered steps (if useful)
                    - Bold for key terms
                    - Code blocks for code
                    - Headings for structure

                    Rules:
                    1. Do not use external knowledge.
                    2. Say "I don't have enough information..." if the answer is not in the context.
                    3. Say "This question is outside my knowledge scope." if it's unrelated.
                    4. Keep responses clean and well-structured."""

    data = {
        "contents": [
            {
                "parts": [
                    {"text": f"Context: {context}\n\nQuestion: {question}"}
                ],
                "role": "user"
            }
        ],
        "generationConfig": {
            "temperature": 0.1,  # Lower temperature for more deterministic answers
            "maxOutputTokens": 800
        },
        "systemInstruction": {
            "parts": [
                {"text": instruction}
            ]
        }
    }

    try:
        response = requests.post(
            f"{GEMINI_API_URL}?key={api_key}",
            headers=headers,
            json=data,
            timeout=30
        )

        if response.status_code != 200:
            print(f"❌ Gemini API Error: {response.status_code} {response.text}")
            return "I'm sorry, I encountered an error processing your request."

        result = response.json()
        if 'candidates' in result and len(result['candidates']) > 0:
            answer = result['candidates'][0]['content']['parts'][0]['text']
            # Additional check to ensure the answer isn't hallucinated
            if "don't know" in answer.lower() or "not enough information" in answer.lower():
                return "I don't have enough information from my knowledge base to answer that."
            return answer
        return "I don't have enough information from my knowledge base to answer that."

    except Exception as e:
        print(f"❌ Exception calling Gemini API: {str(e)}")
        return "I'm sorry, I encountered an error processing your request."
    

# === Load Vectorstore and Create QA Function ===
def create_qa_function(vectorstore_path: str, api_key: str):
    if not os.path.exists(vectorstore_path):
        raise FileNotFoundError(f"🚫 Vectorstore not found at path: {vectorstore_path}")

    vectorstore = FAISS.load_local(
        vectorstore_path,
        HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"),
        allow_dangerous_deserialization=True
    )

    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})
    prompt = get_custom_prompt()

    def qa_function(question: str):
        docs = retriever.get_relevant_documents(question)
        print(docs)
        if not docs:
            return "I don't have enough information from my knowledge base to answer that."
        
        context = "\n\n".join([doc.page_content for doc in docs])
        
        # Additional check if the context is actually relevant
        if not context.strip():
            return "I don't have enough information from my knowledge base to answer that."
            
        return query_gemini_model(context, question, api_key)

    return qa_function

# === Main Ask Function ===
def ask_question(question: str, category: str, api_key: str) -> str:
    print(f"💬 Received question: '{question}'")
    vectorstore_path = f"./vector_dbs/{category}"
    abs_path = os.path.abspath(vectorstore_path)

    try:
        qa_function = create_qa_function(abs_path, api_key) 
        answer = qa_function(question)
        return answer
    except Exception as e:
        return f"❌ Failed to answer question: {e}"

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Enable CORS (optional: useful if you're calling it from a frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Request body schema ===
class AskRequest(BaseModel):
    question: str
    category: str

# === POST endpoint ===
@app.post("/rag")
def ask_endpoint(request: AskRequest):
    try:
        answer = ask_question(
            request.question,
            request.category,
            GEMINI_API_KEY,
        )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
from fastapi import UploadFile, File, Form, UploadFile, HTTPException
from typing import List

@app.post("/ingest")
async def ingest_multiple_files_endpoint(
    files: List[UploadFile] = File(...),
    categories: List[str] = Form(...)
):
    try:
        if len(files) != len(categories):
            raise HTTPException(status_code=400, detail="Each file must have a matching category.")

        temp_dir = os.path.join(BASE_DIR, "dataset")
        os.makedirs(temp_dir, exist_ok=True)

        for file, category in zip(files, categories):
            file_path = os.path.join(temp_dir, file.filename)
            with open(file_path, "wb") as f:
                content = await file.read()
                f.write(content)

            # Process each file
            ingest_file(file_path, category)

        return {
            "status": "success",
            "message": f"{len(files)} files ingested successfully."
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")


# === Run FastAPI server if script is executed directly ===
if __name__ == "__main__":
    uvicorn.run("rag_api:app", host="127.0.0.1", port=8888, reload=True)
