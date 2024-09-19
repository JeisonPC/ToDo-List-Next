import { SelectFormAtomProps } from '@/types/atoms/select-form-atom'
import React from 'react'

export default function SelectFormAtom({
  handleSelectChange,
  options,
  idSelect,
  name,
  value,
}: SelectFormAtomProps) {
  return (
    <>
      <select
        name={name}
        value={value}
        id={idSelect}
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
