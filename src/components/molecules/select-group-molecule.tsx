import React from 'react'
import LabelFormAtom from '../atoms/label-form-atom'
import SelectFormAtom from '../atoms/select-form-atom'
import { SelectGroupMoleculeProps } from '@/types/molecules/select-group-molecules'

export default function SelectGroupMolecule({htmlFor, idSelect, status, label, options, handleSelectChange}: SelectGroupMoleculeProps) {
  return (
    <div>
      <LabelFormAtom label={label} htmlFor={htmlFor} />
      <SelectFormAtom idSelect={idSelect} status={ status } options={ options } handleSelectChange={handleSelectChange}   />
    </div>
  )
}
