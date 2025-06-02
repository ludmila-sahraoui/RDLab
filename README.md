# 🧠 RDLab: On-Premise RAG System for the Oil & Gas Industry

> An AI-powered Retrieval-Augmented Generation (RAG) web application designed to streamline research, document retrieval, and knowledge discovery in the energy sector.

---

## 📌 Overview

**RDLab** is a secure, on-premise research assistant platform tailored for the **Oil & Gas industry**. It leverages **RAG technology** to enable users to upload technical documents and ask domain-specific questions, receiving accurate and context-based answers.

This system addresses the challenge of navigating large volumes of reports, publications, and scientific papers, significantly reducing the time and effort required to extract relevant knowledge.

---
[📄 View Full Project Documentation (PDF)]([https://example.com/path/to/your/file.pdf](https://drive.google.com/file/d/10oM_fMq_FrEC8_zMM1Mj3as-412Q9383/view?usp=drive_link))

## ⚙️ Key Features

- 🔐 **On-Premise Deployment** for full data privacy and compliance  
- 📁 **Secure Document Upload & Indexing** (PDF, DOCX, TXT)  
- 🔎 **Semantic Search with RAG-based Retrieval**  
- 💬 **Interactive Chat Interface** for contextual Q&A  
- 📊 **Admin Dashboard** for document and usage management  
- 📌 **Answer Export (PDF, summaries)**  
- 👥 **Role-Based Access Control (RBAC)** for Admins and Users  

> ⚠️ *Note: RDLab is currently in its MVP stage. Only the core features (document upload, embedding, and answering) are available. Limited time and the novelty of RAG technologies constrained development—other functionalities such as user feedback, improved UI, and multi-language support are still in progress.*

---

## 🧱 Tech Stack

| Layer            | Technology                     |
|------------------|--------------------------------|
| **Frontend**     | React.js, Tailwind CSS         |
| **Backend**      | FastAPI (Python)               |
| **Search Engine**| FAISS                          |
| **Vector Store** | Sentence Transformers + FAISS  |
| **Database**     | PostgreSQL                     |
| **NLP Models**   | LangChain + Gemini API         |
| **Security**     | JWT, RBAC, On-Premise Storage  |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ludmila-sahraoui/RDLab.git
cd rdlab
```
### 2. Install Dependencies

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install

```

### 3. Run the Application

```bash
# Backend
cd backend
uvicorn rag_api:app --reload

# Frontend
cd ../frontend
npm run dev

```
