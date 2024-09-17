import { Task } from "@prisma/client";

export interface DeleteTask extends Pick<Task, 'id'> {}
