from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering


app = FastAPI(
    title="PDF READER (RAG API)",
    description="API that reads a PDF and answer questions using AI.",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




print("Loading")
nome_modelo = "pierreguillou/bert-base-cased-squad-v1.1-portuguese"
tokenizer = AutoTokenizer.from_pretrained(nome_modelo)
modelo = AutoModelForQuestionAnswering.from_pretrained(nome_modelo)
print("AI is ready!")




@app.post("/perguntar")
async def analisar_documento(
    question: str = Form(...),
    file: UploadFile = File(...)
):



    texto_do_pdf = ""
    try:

        with pdfplumber.open(file.file) as pdf:
            for pagina in pdf.pages:
                texto_do_pdf += pagina.extract_text() + "\n"
    except Exception as e:
        return {"erro": f"Could not read the PDF. Details: {e}"}


    inputs = tokenizer(question, texto_do_pdf, return_tensors="pt", truncation=True, max_length=512)

    with torch.no_grad():
        outputs = modelo(**inputs)


    inicio_idx = torch.argmax(outputs.start_logits)
    fim_idx = torch.argmax(outputs.end_logits) + 1

    tokens_resposta = inputs["input_ids"][0][inicio_idx:fim_idx]
    resposta_final = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(tokens_resposta))


    if not resposta_final.strip() or "[CLS]" in resposta_final:
        resposta_final = "Did not found that information."


    return {
        "your_file": file.filename,
        "your_question": question,
        "ai_response": resposta_final
    }