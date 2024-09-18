import { ButtonMoreAtomProps } from "@/types/atoms/button-more-atom";
import { IoMdMore } from "react-icons/io";

export default function ButtonMoreAtom({onClickMore, className} : ButtonMoreAtomProps) {
  return (
    <button className={`${className ? className : ''} border-gray-400 border rounded-full`} onClick={onClickMore}>
      <IoMdMore className="text-2xl" />
    </button>
  );
}
