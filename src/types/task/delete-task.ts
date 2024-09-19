import { Task } from './task';

export interface DeleteTaskType extends Pick<Task, 'id'> {}
