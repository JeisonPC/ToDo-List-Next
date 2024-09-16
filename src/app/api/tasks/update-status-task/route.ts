import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UpdateTaskStatus } from '@/types/task';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {

  const { idTask, status } = await req.json();

  if (!idTask || !status) {
    return NextResponse.json(
      { error: "El ID y el estado son requeridos para actualizar la tarea." },
      { status: 400 }
    );
  }

  try {
    const updatedTask: UpdateTaskStatus = await prisma.task.update({
      where: idTask,
      data: {
        status: status.toUpperCase(),
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
