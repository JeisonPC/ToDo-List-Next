import { FieldFormAtomProps } from '@/types/atoms/field-form-atom'

export default function FieldFormAtom({name, idInput, type, onChange}: FieldFormAtomProps) {
  return (
    <>
      <input name={name} type={type} id={idInput} onChange={onChange} className='p-4 border w-full' />
    </>
  )
}
