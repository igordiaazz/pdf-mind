# PDF Mind - PDF Question Answering with BERT

A Retrieval-Augmented Generation (RAG) system with a modern web interface. Ask questions about any PDF document using a Portuguese-language BERT model.

## Project Structure

```
pdf-mind/
├── api_rag.py                  # FastAPI REST API (backend Python)
├── brainRAG.py                 # Interactive CLI
├── pdfReader.py                # Standalone PDF text extractor
├── requirements.txt            # Python dependencies
├── doc.pdf                     # Sample PDF
├── docker-compose.yml          # PostgreSQL + services
├── .env.example
├── frontend/                   # Next.js web app
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Home - upload PDF + perguntar
│   │   │   ├── layout.tsx      # Root layout com Header
│   │   │   ├── history/        # Histórico de perguntas
│   │   │   └── api/
│   │   │       ├── ask/        # Proxy para API Python
│   │   │       └── history/    # CRUD histórico (PostgreSQL)
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── QuestionForm.tsx
│   │   │   └── HistoryList.tsx
│   │   └── lib/
│   │       ├── prisma.ts
│   │       └── types.ts
│   ├── prisma/schema.prisma    # Modelo PostgreSQL
│   ├── package.json
│   └── next.config.ts
└── README.md
```

## Tech Stack

- **Backend**: Python (FastAPI, HuggingFace BERT, pdfplumber)
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (via Prisma ORM)
- **Infra**: Docker Compose

## Quick Start

### 1. Backend Python

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn api_rag:app --reload
```

### 2. Database (PostgreSQL)

```bash
# Com Docker:
docker compose up -d postgres

# Ou use uma instância PostgreSQL local existente
```

### 3. Frontend

```bash
cd frontend
cp ../.env.example .env
npm install
npx prisma db push
npm run dev
```

Acesse `http://localhost:3000`.

### 4. Tudo junto (Docker)

```bash
docker compose up --build
```

## API (Python)

### `POST /perguntar`

Upload de PDF + pergunta, retorna resposta da IA.

```bash
curl -X POST "http://localhost:8000/perguntar" \
  -F "question=Quem fundou a empresa?" \
  -F "file=@doc.pdf"
```

## Model

[`pierreguillou/bert-base-cased-squad-v1.1-portuguese`](https://huggingface.co/pierreguillou/bert-base-cased-squad-v1.1-portuguese) - BERT fine-tuned for Portuguese QA.

## License

MIT
