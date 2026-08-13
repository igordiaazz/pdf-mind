import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const question = formData.get("question") as string;
  const file = formData.get("file") as File;

  if (!question || !file) {
    return NextResponse.json(
      { error: "question e file são obrigatórios" },
      { status: 400 }
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const pythonForm = new FormData();
    pythonForm.append("question", question);
    pythonForm.append("file", file);

    const pythonRes = await fetch(`${apiUrl}/perguntar`, {
      method: "POST",
      body: pythonForm,
    });

    if (!pythonRes.ok) {
      const err = await pythonRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.erro || "Erro ao processar no backend Python" },
        { status: 502 }
      );
    }

    const data = await pythonRes.json();

    return NextResponse.json({
      filename: data.arquivo || file.name,
      question: data.pergunta || question,
      answer: data.resposta || "Não foi possível encontrar a resposta.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro de conexão com o backend Python (api_rag.py)" },
      { status: 502 }
    );
  }
}
