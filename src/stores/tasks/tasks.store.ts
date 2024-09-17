import { create } from "zustand";
import { TaskState } from "@/types/task";
import { Task } from "@/types/task";
// import { CreateTask } from "@/types/task";
import { tasksFromApi } from "@/services/tasks";

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {
      const tasks = await tasksFromApi();
      set({ tasks });
    } catch (error) {
      console.error("Error al listar las tarea:", error);
    }
  },

  // Crear nueva tarea
  createTask: (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),

  // Actualizar una tarea existente
  updateTask: (id: number, updatedTask: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    })),

  // Eliminar tarea por id
  deleteTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
