import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const { id, title, description, status } = await req.json();

  if (!id || !title || !description || !status) {
    return NextResponse.json(
      {
        error:
          "ID, título, descripción y estado son requeridos para actualizar la tarea.",
      },
      { status: 400 }
    );
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: title,
        description: description,
        status: status.toUpperCase(),
      },
    });

    return NextResponse.json(
      { message: `Tarea actualizada correctamente:`, updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error actualizando la tarea:", error);
    return NextResponse.json(
      { error: "Error actualizando la tarea:" },
      { status: 500 }
    );
  }
}
