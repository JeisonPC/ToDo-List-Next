import { ButtonDeleteAtomProps } from "@/types/atoms/button-delete-atom";
import { MdDeleteOutline } from "react-icons/md";

export default function ButtonDeleteAtom({ onClickDelete} : ButtonDeleteAtomProps) {
  return (
    <button data-testid="delete-button" onClick={onClickDelete} className="text-2xl text-red-400">
      <MdDeleteOutline />
    </button>
  );
}
