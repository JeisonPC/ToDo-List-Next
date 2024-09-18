import { FieldFormAtomProps } from '@/types/atoms/field-form-atom'
import React from 'react'

export default function FieldFormAtom({type, onChange}: FieldFormAtomProps) {
  return (
    <>
      <input type={type} onChange={onChange} className='p-4 border w-full' />
    </>
  )
}
