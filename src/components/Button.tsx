import { ButtonHTMLAttributes } from 'react'
import cx from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cx(
        `h-12 px-3 bg-[#00875F] font-medium text-sm text-white rounded-md focus:outline-none
          disabled:bg-[#A9A9B2] disabled:cursor-not-allowed 
          hover:enabled:brightness-95 
          transition-colors
        `,
        className,
      )}
    >
      {children}
    </button>
  )
}
