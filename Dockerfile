FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY brainRAG.py .
COPY pdfReader.py .

ENTRYPOINT ["python", "brainRAG.py"]
CMD ["doc.pdf"]
