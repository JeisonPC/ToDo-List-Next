import { ButtonCreateAtomProps } from "@/types/atoms";
import { FaPlusCircle } from "react-icons/fa";

export default function ButtonCreateAtom({ onClick , className }: ButtonCreateAtomProps) {
  return (
    <button onClick={onClick} className={`p-2 rounded-full shadow-2xl bg-orange-200 ${className}`}>
      <FaPlusCircle className="text-6xl text-orange-500 bg-white rounded-full" />
    </button>
  );
}
