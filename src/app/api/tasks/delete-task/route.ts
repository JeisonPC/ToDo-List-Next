import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DeleteTaskType } from '@/types/task';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const taskIdStr = url.searchParams.get('taskId');

  const taskId = parseInt(taskIdStr || '', 10);

  // Validamos si se proporciona un ID
  if (!taskId) {
    return NextResponse.json(
      { error: "El ID de la tarea es requerido para eliminarla." },
      { status: 400 }
    );
  }

  try {
    const deletedTask: DeleteTaskType = await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json(
      { message: `Tarea eliminada correctamente:`, deletedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return NextResponse.json(
      { error: "Error al eliminar la tarea." },
      { status: 500 }
    );
  }
}
