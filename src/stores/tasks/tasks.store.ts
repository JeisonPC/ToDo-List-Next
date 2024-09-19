import { create } from "zustand";
import { CreateTaskType, TaskState, UpdateTaskType } from "@/types/task";
import { tasksFromApi, taskCreateApi, taskUpdateApi, taskDeleteApi } from "@/services/tasks";
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
  createTask: async (newTask: CreateTaskType) => {
    const task = await taskCreateApi(newTask);
    return set((state) => ({
      ...state,
      tasks: [...state.tasks, task],
    }));
  },
  updateTask: async (taskId: number, updatedTask: UpdateTaskType) => {
    const task = await taskUpdateApi(taskId, updatedTask);
    return set((state) => ({
      ...state,
      tasks: state.tasks.map((p) => (p.id === task.id ? task : p)),
    }));
  },
  deleteTask: async (taskId: number) => {
    const task = await taskDeleteApi(taskId);
    return set((state) => ({
      ...state,
      tasks: state.tasks.filter((p) => p.id !== task.id),
    }));
  }
}));
