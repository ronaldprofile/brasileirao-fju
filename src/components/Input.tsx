import { InputHTMLAttributes } from 'react'
import cx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={cx(
        `h-12 px-3 bg-[#121214] text-sm  text-white placeholder:text-[#7C7C8A] rounded-md 
        outline-none border-2 border-transparent focus:border-[#00875F] transition-colors`,
        className,
      )}
    />
  )
}
