import { LabelFormAtomProps } from "@/types/atoms/label-form-atom";
import React from "react";

export default function LabelFormAtom({ htmlFor, label }: LabelFormAtomProps) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
}
