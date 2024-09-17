import { StatusAtomProps } from '@/types/atoms';

export default function statusAtom({ status }: StatusAtomProps ) {
  return (
    <div>
      {status}
    </div>
  )
}
