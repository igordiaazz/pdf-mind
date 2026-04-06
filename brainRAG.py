import pdfplumber
import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering



arqPDF = "doc.pdf"
arqTXT = ""

print(f"Reading PDF '{arqPDF}' (just some seconds...)")


try:
    with pdfplumber.open(arqPDF) as pdf:
        for page in pdf.pages:
            arqTXT += page.extract_text() + "\n"
            print("PDF has been read sucessfully!\n")

except Exception as e:
    print(f"Could not read the PDF: {e}")
    exit()


print("Initializing BERT...")
nome_modelo = "pierreguillou/bert-base-cased-squad-v1.1-portuguese"
tokenizer = AutoTokenizer.from_pretrained(nome_modelo)
modelo = AutoModelForQuestionAnswering.from_pretrained(nome_modelo)


print("IA Ready!")
print("Ask anything about the PDF content (or type 'exit'):")


while True:
    pergunta = input("What is your question?: ")
    if pergunta == "exit":
        break


    inputs = tokenizer(pergunta, arqTXT, return_tensors="pt", truncation=True, max_length=512)

    with torch.no_grad():
        outputs = modelo(**inputs)


    inicioRESP = torch.argmax(outputs.start_logits)
    fimRESP = torch.argmax(outputs.end_logits) + 1


    tokens_resposta = inputs["input_ids"][0][inicioRESP:fimRESP]
    resposta_final = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(tokens_resposta))

    if not resposta_final.strip() or "[CLS]" in resposta_final:
        print("AI: Sorry, did not found that information.")
    else:
        print(f"AI: '{resposta_final}'")


