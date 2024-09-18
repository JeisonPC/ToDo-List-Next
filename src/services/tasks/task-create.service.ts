import { CreateTask, Task } from '@/types/task';


export async function taskCreateApi(newTask: CreateTask): Promise<Task> {
  const response = await fetch('/api/tasks/create-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) throw new Error('Error creando la tarea');
  const data = await response.json();
  console.log("Respuesta de la API:", data);

  return data.createTask;
}
