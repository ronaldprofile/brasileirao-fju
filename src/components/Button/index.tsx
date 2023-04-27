import { ButtonHTMLAttributes } from 'react'
import cx from 'clsx'

import styles from './styles.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean
}

export function Button({
  className,
  outlined = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cx(
        styles.button,
        className,
        outlined && styles['button-outlined'],
      )}
    >
      {children}
    </button>
  )
}
