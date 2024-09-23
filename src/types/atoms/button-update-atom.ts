import { UpdateTaskType } from "../task";

export interface ButtonUpdateAtomProps extends UpdateTaskType {
  onClickUpdate: () => void;
  className?: string;
  taskId: number;
}
