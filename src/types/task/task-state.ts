import { CreateTask } from './create-task';
import { Task } from './task';

export interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (newTask: CreateTask) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}
