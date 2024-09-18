import { UpdateTask } from "../task";

export interface ButtonUpdateAtomProps extends UpdateTask {
  onClickUpdate: () => void;
  className?: string;
  taskId: number;
}
