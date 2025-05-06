import os
import shutil
import uuid

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.docstore.document import Document
from langchain.prompts import PromptTemplate

from docling.document_converter import DocumentConverter
from typing import List
from pathlib import Path
import requests



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


# === deepseek API Key ===
DeepSeek_API_KEY = "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"
DeepSeek_API_URL="https://openrouter.ai/api/v1"

# === Prompt Template ===
def get_custom_prompt() -> PromptTemplate:
    return PromptTemplate.from_template("""
        You are a professional assistant.
        Use only the provided context to answer the question.

        If the context does not contain enough information, respond with:
        "I'm sorry, I don't have enough information to answer that."

        Format your answer for technical professionals:
        - Use clear sections with bullet points or subheadings.
        - Include numeric values, classifications, or mechanisms where relevant.
        - Maintain professional tone, technical accuracy, and clarity.
        
        ------------------
        Context:
        {context}
        ------------------

        Question: {question}

        Expert Answer:
    """)

# === Call DeepSeek via OpenRouter ===
def query_deepseek_model(full_prompt: str, api_key: str, api_url: str) -> str:
    print("📡 Sending request to DeepSeek via OpenRouter...")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "deepseek/deepseek-prover-v2:free",  
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant restricted to the given context."
            },
            {
                "role": "user",
                "content": full_prompt
            }
        ]
    ,
        "temperature": 0.2,
        "max_tokens": 800,
        
    }

    response = requests.post(f"{api_url}/chat/completions", json=data, headers=headers)

    if response.status_code != 200:
        print(f"❌ DeepSeek API Error: {response.status_code} {response.text}")
        raise Exception(f"DeepSeek API error: {response.status_code} {response.text}")

    result = response.json()
    return result.get("choices", [{}])[0].get("message", {}).get("content", 
           "I'm sorry, I don't have enough information to answer that.")

# === Load Vectorstore and Create QA Function ===
def create_qa_function(vectorstore_path: str, api_key: str, api_url: str):
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
        context = "\n\n".join([doc.page_content for doc in docs])
        full_prompt = prompt.format(context=context, question=question)
        print(full_prompt)
        return query_deepseek_model(full_prompt, api_key, api_url)

    return qa_function

# === Main Ask Function ===
def ask_question(question: str, category: str, api_key: str, api_url: str) -> str:
    print(f"💬 Received question: '{question}'")
    vectorstore_path = f"./vector_dbs/{category}"
    abs_path = os.path.abspath(vectorstore_path)

    try:
        qa_function = create_qa_function(abs_path, api_key, api_url)
        print("🚀 Running QA function...")
        answer = qa_function(question)
        print("✅ Answer generated successfully.")
        print(answer)
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
            DeepSeek_API_KEY,
            DeepSeek_API_URL
        )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# === Run FastAPI server if script is executed directly ===
if __name__ == "__main__":
    uvicorn.run("rag_api:app", host="127.0.0.1", port=8888, reload=True)
