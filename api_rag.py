from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering


app = FastAPI(
    title="PDF Mind (RAG API)",
    description="API que lê um PDF e responde perguntas usando IA (BERT português).",
    version="1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


print("Carregando modelo BERT (português)...")
nome_modelo = "pierreguillou/bert-base-cased-squad-v1.1-portuguese"
tokenizer = AutoTokenizer.from_pretrained(nome_modelo)
modelo = AutoModelForQuestionAnswering.from_pretrained(nome_modelo)
print("IA pronta!")


@app.get("/")
def root():
    return {"status": "ok", "message": "PDF Mind API está rodando."}


@app.post("/perguntar")
async def analisar_documento(
    question: str = Form(...),
    file: UploadFile = File(...),
):
    texto_do_pdf = ""
    try:
        with pdfplumber.open(file.file) as pdf:
            for pagina in pdf.pages:
                texto_do_pdf += (pagina.extract_text() or "") + "\n"
    except Exception as e:
        return {"erro": f"Não foi possível ler o PDF. Detalhes: {e}"}

    if not texto_do_pdf.strip():
        return {"erro": "O PDF não contém texto extraível."}

    inputs = tokenizer(
        question,
        texto_do_pdf,
        return_tensors="pt",
        truncation=True,
        max_length=512,
    )

    with torch.no_grad():
        outputs = modelo(**inputs)

    inicio_idx = torch.argmax(outputs.start_logits)
    fim_idx = torch.argmax(outputs.end_logits) + 1

    tokens_resposta = inputs["input_ids"][0][inicio_idx:fim_idx]
    resposta_final = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(tokens_resposta)
    )

    if not resposta_final.strip() or "[CLS]" in resposta_final:
        resposta_final = "Não encontrei essa informação no documento."

    return {
        "arquivo": file.filename,
        "pergunta": question,
        "resposta": resposta_final,
    }
