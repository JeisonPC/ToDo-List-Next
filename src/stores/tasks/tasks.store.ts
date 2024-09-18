import { create } from "zustand";
import { CreateTask, TaskState, UpdateTask } from "@/types/task";
import { tasksFromApi, taskCreateApi, taskUpdateApi } from "@/services/tasks";

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
  createTask: async (newTask: CreateTask) => {
    const task = await taskCreateApi(newTask);
    return set((state) => ({
      ...state,
      tasks: [...state.tasks, task],
    }));
  },
  updateTask: async (updatedTask: UpdateTask) => {
    const task = await taskUpdateApi(updatedTask);
    return set((state) => ({
      ...state,
      tasks: state.tasks.map((p) => (p.id === task.id ? task : p)),
    }));
  },
  deleteTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
