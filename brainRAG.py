import argparse
import pdfplumber
import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering


def ler_pdf(caminho: str) -> str:
    print(f"Lendo o PDF '{caminho}' (aguarde alguns segundos)...")
    texto = ""
    with pdfplumber.open(caminho) as pdf:
        for pagina in pdf.pages:
            texto += (pagina.extract_text() or "") + "\n"
    if not texto.strip():
        raise ValueError("O PDF não contém texto extraível.")
    print("PDF lido com sucesso!")
    return texto


def carregar_modelo():
    print("Carregando modelo BERT (português)...")
    nome_modelo = "pierreguillou/bert-base-cased-squad-v1.1-portuguese"
    tokenizer = AutoTokenizer.from_pretrained(nome_modelo)
    modelo = AutoModelForQuestionAnswering.from_pretrained(nome_modelo)
    print("IA pronta!")
    return tokenizer, modelo


def responder(pergunta: str, texto: str, tokenizer, modelo) -> str:
    inputs = tokenizer(
        pergunta,
        texto,
        return_tensors="pt",
        truncation=True,
        max_length=512,
    )

    with torch.no_grad():
        outputs = modelo(**inputs)

    inicio = torch.argmax(outputs.start_logits)
    fim = torch.argmax(outputs.end_logits) + 1

    tokens_resposta = inputs["input_ids"][0][inicio:fim]
    resposta = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(tokens_resposta)
    )

    if not resposta.strip() or "[CLS]" in resposta:
        return "Não encontrei essa informação no documento."
    return resposta


def main():
    parser = argparse.ArgumentParser(
        description="PDF Mind - responde perguntas sobre um PDF usando BERT (português)."
    )
    parser.add_argument(
        "pdf",
        nargs="?",
        default="doc.pdf",
        help="Caminho do PDF a ser analisado (padrão: doc.pdf).",
    )
    args = parser.parse_args()

    try:
        texto = ler_pdf(args.pdf)
    except Exception as e:
        print(f"Não foi possível ler o PDF: {e}")
        return

    tokenizer, modelo = carregar_modelo()

    print("\nPergunte qualquer coisa sobre o conteúdo do PDF (ou digite 'sair'):")
    while True:
        pergunta = input("Sua pergunta: ").strip()
        if pergunta.lower() in ("sair", "exit", "q"):
            break
        if not pergunta:
            continue
        print(f"IA: '{responder(pergunta, texto, tokenizer, modelo)}'\n")


if __name__ == "__main__":
    main()
