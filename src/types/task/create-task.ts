import { Task } from './task';
export interface CreateTask extends Omit<Task, 'id' | 'createdAt' | 'updatedAt' > {
  title: string;
  description?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
