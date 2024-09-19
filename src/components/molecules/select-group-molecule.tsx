import React from "react";
import LabelFormAtom from "../atoms/label-form-atom";
import SelectFormAtom from "../atoms/select-form-atom";
import { SelectGroupMoleculeProps } from "@/types/molecules/select-group-molecules";

export default function SelectGroupMolecule({
  name,
  value,
  htmlFor,
  idSelect,
  label,
  options,
  handleSelectChange,
}: SelectGroupMoleculeProps) {
  return (
    <div>
      <LabelFormAtom label={label} htmlFor={htmlFor} />
      <SelectFormAtom
        idSelect={idSelect}
        options={options}
        handleSelectChange={handleSelectChange}
        name={name}
        value={value}
      />
    </div>
  );
}
