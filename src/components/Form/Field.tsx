import { HTMLAttributes } from 'react'

type FieldProps = HTMLAttributes<HTMLDivElement>

export function Field(props: FieldProps) {
  return <div className="mb-4 flex flex-col gap-2" {...props} />
}
