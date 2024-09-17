import { Task } from './task';

export interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (newTask: Task) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}
