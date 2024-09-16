import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UpdateTask } from "@/types/task";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const { taskId, title, description, status } = await req.json();

  if (!taskId || !title || !description || !status) {
    return NextResponse.json(
      {
        error:
          "ID, título, descripción y estado son requeridos para actualizar la tarea.",
      },
      { status: 400 }
    );
  }

  const updateTaskData: UpdateTask = {
    title: title,
    description: description,
    status: status.toUpperCase(),
  };

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updateTaskData
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
