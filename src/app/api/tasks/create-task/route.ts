import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateTaskType } from '@/types/task';
import validator from 'validator';


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { title, description, status } = await req.json();

  if (!title || !description || !status) {
    return NextResponse.json(
      { error: "Todos los campos son requeridos." },
      { status: 400 }
    );
  }

  const sanitizedTitle = validator.escape(title.trim());
  const sanitizedDescription = validator.escape(description.trim());
  const sanitizedStatus = status.toUpperCase();

  // Validar que el estado sea uno de los valores permitidos
  const validStatuses = ['COMPLETED', 'PENDING', 'IN_PROGRESS'];
  if (!validStatuses.includes(sanitizedStatus)) {
    return NextResponse.json(
      { error: "Estado inválido." },
      { status: 400 }
    );
  }

  const taskData: CreateTaskType = {
    title: sanitizedTitle,
    description: sanitizedDescription,
    status: sanitizedStatus,
  };

  try {
    const createTask: CreateTaskType = await prisma.task.create({ data: taskData });

    return NextResponse.json(
      { message: `Tarea creada correctamente:`, createTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    return NextResponse.json(
      { error: "Error al crear la tarea:" },
      { status: 500 }
    );
  }
}
