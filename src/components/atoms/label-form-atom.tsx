import { LabelFormAtomProps } from "@/types/atoms/label-form-atom";
import React from "react";

export default function LabelFormAtom({ label }: LabelFormAtomProps) {
  return (
    <div>
      <label>{label}</label>
    </div>
  );
}
