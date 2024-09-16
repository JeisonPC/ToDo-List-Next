import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, description, status } = await req.json();

    if (!title || !description || !status) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    const taskData = {
      title: title,
      description: description,
      status: status.toUpperCase(),
    };

    const createTask = await prisma.task.create({ data: taskData });

    return NextResponse.json(
      { message: `Tarea creada correctamente:`, createTask },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return NextResponse.json({ error: 'Error al crear la tarea:' }, { status: 500 });
  }
}
