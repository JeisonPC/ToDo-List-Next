import { Task } from './task';
export interface CreateTaskType extends Omit<Task, 'id' | 'createdAt' | 'updatedAt' > {
}
