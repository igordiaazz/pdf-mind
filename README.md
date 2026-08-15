# PDF Mind - PDF Question Answering with BERT (modo terminal)

Uma ferramenta de **Retrieval-Augmented Generation (RAG)** que responde perguntas
sobre qualquer PDF usando um modelo BERT em português, rodando **apenas pelo terminal**.

- Modelo: [`pierreguillou/bert-base-cased-squad-v1.1-portuguese`](https://huggingface.co/pierreguillou/bert-base-cased-squad-v1.1-portuguese)
- Stack: Python, PyTorch, HuggingFace Transformers, pdfplumber

## Como rodar

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python brainRAG.py caminho/do/arquivo.pdf
```

Se nenhum PDF for passado, o padrão é `doc.pdf`. Digite `sair` para encerrar.
As perguntas são feitas interativamente no terminal.

## Rodando com Docker

Requer [Docker](https://www.docker.com/). O container roda o modo interativo
de terminal (precisa de um TTY). Coloque seu PDF como `doc.pdf` na raiz do projeto
(ou ajuste o volume no `docker-compose.yml`):

```bash
docker compose run --rm pdfmind
```

Na primeira execução o container baixa o modelo BERT (pode demorar um pouco).

## Estrutura

```
pdf-mind/
├── brainRAG.py         # CLI interativa: lê um PDF e responde perguntas via terminal
├── pdfReader.py        # Extrator de texto de PDF (standalone)
├── requirements.txt    # Dependências Python
├── Dockerfile          # Imagem para rodar a CLI em container
└── docker-compose.yml  # Orquestra o container interativo
```

## Licença

MIT
