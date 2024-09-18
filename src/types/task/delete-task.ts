import { Task } from './task';

export interface DeleteTask extends Pick<Task, 'id'> {}
