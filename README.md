# PDF Mind - PDF Question Answering with BERT (CLI)

A Retrieval-Augmented Generation (RAG) tool that runs entirely on the command
line. Ask questions about any PDF document using a Portuguese-language BERT
model. No web server, no frontend.

## Project Structure

```
pdf-mind/
├── brainRAG.py      # Interactive CLI: reads a PDF and answers questions
├── pdfReader.py     # Standalone PDF text extractor
├── requirements.txt # Python dependencies
└── README.md
```

## Tech Stack

- **Python** (PyTorch, HuggingFace Transformers, pdfplumber)
- **Model**: [`pierreguillou/bert-base-cased-squad-v1.1-portuguese`](https://huggingface.co/pierreguillou/bert-base-cased-squad-v1.1-portuguese) - BERT fine-tuned for Portuguese QA.

## Quick Start

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 1. Ask questions about a PDF (interactive)

Open `brainRAG.py` and set the PDF file name at the top:

```python
arqPDF = "doc.pdf"
```

Then run:

```bash
python brainRAG.py
```

Type your question and press Enter. Type `exit` to quit.

### 2. Extract text from a PDF

Open `pdfReader.py` and set the PDF file name at the top:

```python
arquivo_pdf = "meu_documento.pdf"
```

Then run:

```bash
python pdfReader.py
```

> Observação: `doc.pdf` / `meu_documento.pdf` não existem no repositório.
> Crie ou baixe um PDF de exemplo antes de rodar os scripts.

## License

MIT
