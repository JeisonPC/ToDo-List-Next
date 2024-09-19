import { ButtonUpdateAtomProps } from "@/types/atoms/button-update-atom";
import { CiEdit } from "react-icons/ci";

export default function ButtonUpdateAtom({ onClickUpdate} : ButtonUpdateAtomProps) {
  return (
    <button data-testid="update-button" onClick={onClickUpdate}>
      <CiEdit className="text-2xl" />
    </button>
  );
}
