import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UpdateTaskType } from "@/types/task";
import validator from "validator";

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

  const sanitizedTitle = validator.escape(title.trim());
  const sanitizedDescription = validator.escape(description.trim());
  const sanitizedStatus = status.trim().toUpperCase();

  const validStatuses = ["COMPLETED", "PENDING", "IN_PROGRESS"];
  if (!validStatuses.includes(sanitizedStatus)) {
    return NextResponse.json(
      {
        error:
          "Estado inválido. Debe ser 'PENDING', 'IN_PROGRESS' o 'COMPLETED'.",
      },
      { status: 400 }
    );
  }

  const updateTaskData: UpdateTaskType = {
    title: sanitizedTitle,
    description: sanitizedDescription,
    status: sanitizedStatus,
  };

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updateTaskData,
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
