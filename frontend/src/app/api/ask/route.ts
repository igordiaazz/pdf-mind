import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const question = formData.get("question") as string;
  const file = formData.get("file") as File;

  if (!question || !file) {
    return NextResponse.json(
      { error: "question and file are required" },
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
      return NextResponse.json(
        { error: "Erro ao processar no backend Python" },
        { status: 502 }
      );
    }

    const data = await pythonRes.json();
    const answer = data.ai_response || "Não foi possível encontrar a resposta.";

    let saved;
    try {
      saved = await prisma.question.create({
        data: {
          filename: file.name,
          question,
          answer,
        },
      });
    } catch {
      saved = null;
    }

    return NextResponse.json({
      filename: file.name,
      question,
      answer,
      id: saved?.id ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro de conexão com o backend Python" },
      { status: 502 }
    );
  }
}
