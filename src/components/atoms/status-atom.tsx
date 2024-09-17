import { StatusAtomProps } from "@/types/atoms";
import CompletedIcon from "@/components/icons/completed-icon";
import InProgressIcon from "../icons/inProgress-icon";
import PendingIcon from "../icons/pending-icon";

export default function StatusAtom({ status }: StatusAtomProps) {
  let IconComponent;

  switch (status) {
    case "COMPLETED":
      IconComponent = <CompletedIcon />;
      break;
    case "IN_PROGRESS":
      IconComponent = <InProgressIcon />;
      break;
    case "PENDING":
      IconComponent = <PendingIcon />;
  }

  return <div>{IconComponent}</div>;
}
