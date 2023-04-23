import { ReactNode } from 'react'

interface FormBoxProps {
  children: ReactNode
}

export function FormBox({ children }: FormBoxProps) {
  return (
    <div className="p-6 bg-[#202024] border border-[#323238] rounded-md">
      {children}
    </div>
  )
}
