import React from 'react'
import LabelFormAtom from '../atoms/label-form-atom'
import SelectFormAtom from '../atoms/select-form-atom'
import { SelectGroupMoleculeProps } from '@/types/molecules/select-group-molecules'

export default function SelectGroupMolecule({status, label, options, handleSelectChange}: SelectGroupMoleculeProps) {
  return (
    <div>
      <LabelFormAtom label={label} />
      <SelectFormAtom status={ status } options={ options } handleSelectChange={handleSelectChange}   />
    </div>
  )
}
