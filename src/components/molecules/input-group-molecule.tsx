import React from 'react'
import LabelFormAtom from '../atoms/label-form-atom'
import FieldFormAtom from '../atoms/field-form-atom'
import { InputGroupMoleculeProps } from '@/types/molecules/input-group-moluecules'

export default function InputGroupMolecule({ type, label, onChange}: InputGroupMoleculeProps) {
  return (
    <div>
      <LabelFormAtom label={label} />
      <FieldFormAtom type={type} onChange={onChange} />
    </div>
  )
}
