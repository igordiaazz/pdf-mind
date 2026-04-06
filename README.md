# 🧠 BrainRAG — PDF Question Answering with BERT

A lightweight Retrieval-Augmented Generation (RAG) system that lets you ask questions about any PDF document using a Portuguese-language BERT model. Available both as a **REST API** (FastAPI) and a **command-line interface**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [CLI Mode](#cli-mode)
  - [API Mode](#api-mode)
- [API Reference](#api-reference)
- [Model](#model)
- [Limitations](#limitations)
- [License](#license)

---

## Overview

BrainRAG extracts text from PDF files and uses a fine-tuned BERT model (`bert-base-cased-squad-v1.1-portuguese`) to answer natural language questions based on the document's content. It is designed for Portuguese-language documents but can be adapted for other languages.

---

## Features

- 📄 PDF text extraction with `pdfplumber`
- 🤖 Question answering powered by HuggingFace Transformers (BERT)
- 🌐 REST API built with FastAPI
- 💻 Interactive CLI for local use
- ⚡ GPU-accelerated inference via PyTorch (when available)

---

## Project Structure

```
brainRAG/
├── api_rag.py          # FastAPI REST API
├── brainRAG.py         # Interactive CLI
├── pdfReader.py        # Standalone PDF text extractor utility
├── requirements.txt    # Python dependencies
└── doc.pdf             # Sample PDF for testing
```

---

## Requirements

- Python 3.9+
- pip

> GPU support is optional but recommended for faster inference.

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/brainRAG.git
cd brainRAG
```

**2. Create and activate a virtual environment** *(recommended)*

```bash
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

> ⚠️ The first run will download the BERT model (~400 MB) from HuggingFace Hub automatically.

---

## Usage

### CLI Mode

Ask questions interactively about a local PDF file.

1. Place your PDF in the project root and update the filename in `brainRAG.py`:

```python
arqPDF = "your_document.pdf"
```

2. Run:

```bash
python brainRAG.py
```

3. Type your question when prompted:

```
What is your question?: Who founded the company?
AI: 'Steve Jobs, Steve Wozniak and Ronald Wayne'
```

Type `exit` to quit.

---

### API Mode

Start the FastAPI server:

```bash
uvicorn api_rag:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

Interactive documentation (Swagger UI): `http://127.0.0.1:8000/docs`

---

## API Reference

### `POST /perguntar`

Accepts a PDF file and a question, returns the AI-generated answer.

**Request** — `multipart/form-data`

| Field      | Type   | Description                          |
|------------|--------|--------------------------------------|
| `question` | string | The question to ask about the PDF    |
| `file`     | file   | The PDF file to be analyzed          |

**Response** — `application/json`

```json
{
  "your_file": "document.pdf",
  "your_question": "Who founded the company?",
  "ai_response": "Steve Jobs, Steve Wozniak and Ronald Wayne"
}
```

**Example with `curl`**

```bash
curl -X POST "http://127.0.0.1:8000/perguntar" \
  -F "question=Who founded the company?" \
  -F "file=@doc.pdf"
```

---

## Model

This project uses [`pierreguillou/bert-base-cased-squad-v1.1-portuguese`](https://huggingface.co/pierreguillou/bert-base-cased-squad-v1.1-portuguese), a BERT model fine-tuned for extractive question answering on Portuguese text (SQuAD format).

---

## Limitations

- Input is truncated at **512 tokens** — very long documents may lose context.
- The model performs **extractive QA** only: answers must exist verbatim in the PDF text.
- Scanned PDFs (image-based) are not supported — text must be selectable.

---

## License

This project is licensed under the [MIT License](LICENSE).
