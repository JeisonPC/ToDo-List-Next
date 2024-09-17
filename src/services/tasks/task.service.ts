import { Task } from '@/types/task';

export async function tasksFromApi(): Promise<Task[]> {
  const response = await fetch('/api/tasks');
  if (!response.ok) throw new Error('Error listando las tareas');
  const data = await response.json();
  return data.tasks;
}
