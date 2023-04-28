import { InputHTMLAttributes, forwardRef } from 'react'
import cx from 'clsx'

import styles from './styles.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <input
          {...rest}
          ref={ref}
          className={cx(styles.input, className, {
            'focus:border-[#00875F]': !error,
            'focus:border-[#D92D20]': !!error,
          })}
        />

        {error && <span className="text-xs text-[#D92D20]">{error} </span>}
      </div>
    )
  },
)
