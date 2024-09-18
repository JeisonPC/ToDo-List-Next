import { Task } from "@/types/task";
import { UpdateTask } from "@/types/task/update-task";

export async function taskUpdateApi(updatedTask: UpdateTask): Promise<Task> {
  const taskId = updatedTask.id;
  const response = await fetch(`/api/tasks/update-task`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId, ...updatedTask }),
  });

  if (!response.ok) {
    throw new Error('Error actualizando la tarea');
  }

  const data = await response.json();
  return data.updatedTask;
}
