import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {

  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json(
      { error: "El ID y el estado son requeridos para actualizar la tarea." },
      { status: 400 }
    );
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        status: status.toUpperCase(),  // Se asegura de que el status esté en mayúsculas
      },
    });

    return NextResponse.json(
      { message: `El estado de la tarea se actualizó correctamente:`, updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error actualizando el estado de la tarea:", error);
    return NextResponse.json(
      { error: "Error actualizando el estado de la tarea." },
      { status: 500 }
    );
  }
}
