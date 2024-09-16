import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DeleteTask } from '@/types/task';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const { taskId } = await req.json();

  // Validamos si se proporciona un ID
  if (!taskId) {
    return NextResponse.json(
      { error: "El ID de la tarea es requerido para eliminarla." },
      { status: 400 }
    );
  }

  try {
    const deletedTask: DeleteTask = await prisma.task.delete({
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
