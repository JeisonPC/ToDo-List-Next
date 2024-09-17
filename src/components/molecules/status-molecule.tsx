import React from 'react'
import StatusAtom from '../atoms/status-atom'
import { StatusAtomProps } from '@/types/atoms';

export default function StatusMolecule({ status }: StatusAtomProps) {
  return (
    <div>
      <StatusAtom status={status} />
    </div>
  )
}
