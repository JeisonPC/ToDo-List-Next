import React from 'react'
import LabelFormAtom from '../atoms/label-form-atom'
import FieldFormAtom from '../atoms/field-form-atom'
import { InputGroupMoleculeProps } from '@/types/molecules/input-group-moluecules'

export default function InputGroupMolecule({ value, name, idInput, htmlFor, type, label, onChange}: InputGroupMoleculeProps) {
  return (
    <div>
      <LabelFormAtom label={label} htmlFor={htmlFor} />
      <FieldFormAtom value={value} name={name} type={type} idInput={idInput} onChange={onChange} />
    </div>
  )
}
