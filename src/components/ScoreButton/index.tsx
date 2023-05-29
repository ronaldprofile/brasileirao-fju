import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ScoreButton({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type="button"
      className="w-8 h-8 flex justify-center items-center hover:bg-[#323238] rounded-md"
    >
      {children}
    </button>
  )
}
