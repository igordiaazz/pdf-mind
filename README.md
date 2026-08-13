# PDF Mind - PDF Question Answering with BERT

Uma ferramenta de **Retrieval-Augmented Generation (RAG)** que responde perguntas
sobre qualquer PDF usando um modelo BERT em português. O projeto combina:

- Um **backend em Python (FastAPI)** que carrega o modelo BERT e processa os PDFs.
- Um **frontend em React/Next.js + Tailwind CSS** (modo escuro) para enviar o PDF
  e fazer perguntas pela interface web.

## Tech Stack

- **Backend**: Python, PyTorch, HuggingFace Transformers, pdfplumber, FastAPI
- **Modelo**: [`pierreguillou/bert-base-cased-squad-v1.1-portuguese`](https://huggingface.co/pierreguillou/bert-base-cased-squad-v1.1-portuguese)
- **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS v4

## Como rodar

### 1. Backend (API Python)

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn api_rag:app --reload --port 8000
```

A API fica disponível em `http://localhost:8000` (endpoint `POST /perguntar`).

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:3000`, envie um PDF e faça perguntas.

> O frontend se comunica com o backend via proxy (`frontend/src/app/api/ask/route.ts`),
> que encaminha a requisição para `http://localhost:8000/perguntar`. Para mudar a URL
> do backend, defina `NEXT_PUBLIC_API_URL` (veja `frontend/.env.example`).

## Estrutura

```
pdf-mind/
├── api_rag.py          # Backend FastAPI (modelo BERT + leitura de PDF)
├── brainRAG.py         # CLI original (modo interativo via terminal)
├── pdfReader.py        # Extrator de texto de PDF (standalone)
├── requirements.txt    # Dependências Python
└── frontend/           # Aplicação Next.js (React + Tailwind, dark mode)
```

## Licença

MIT
