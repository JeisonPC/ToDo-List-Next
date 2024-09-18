
export async function taskDeleteApi(taskId: number): Promise<{
  id: number; message: string
}> {
  const response = await fetch(`/api/tasks/delete-task?taskId=${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskId),
  });

  if (!response.ok) throw new Error('Error eliminando la tarea');

  const data = await response.json();
  console.log("Respuesta de la API:", data);

  return data.deletedTask;
}
