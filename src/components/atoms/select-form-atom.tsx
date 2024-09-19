import { SelectFormAtomProps } from '@/types/atoms/select-form-atom'
import React from 'react'

export default function SelectFormAtom({
  status,
  handleSelectChange,
  options,
  idSelect
}: SelectFormAtomProps) {
  return (
    <>
      <select
        id={idSelect}
        value={status}
        onChange={handleSelectChange} // Manejador onChange para el select
        className="border p-4 block w-full"
      >
        {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      </select>
    </>
  )
}
