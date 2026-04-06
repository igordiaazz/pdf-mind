import pdfplumber

arquivo_pdf = "meu_documento.pdf"

print(f"Trying to open: {arquivo_pdf}...\n")

try:
    with pdfplumber.open(arquivo_pdf) as pdf:


        texto_completo = ""


        for pagina in pdf.pages:

            texto_completo += pagina.extract_text() + "\n"

        print("--- SUCESS! ALL PAGES TEXT HAS BEEN EXTRACTED ---")
        print(texto_completo)
        print("---------------------------------------------------")

except Exception as e:
    print(f"Ocorreu um erro: {e}")