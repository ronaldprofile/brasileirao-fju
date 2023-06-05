import { LabelHTMLAttributes } from 'react'

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-[#E1E1E6] text-sm" {...props} />
}
