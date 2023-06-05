import { InputProps } from '../Input'
import cx from 'clsx'

type InputRadioProps = Omit<InputProps, 'error'>

export function InputRadio({ className, ...rest }: InputRadioProps) {
  return (
    <input
      type="radio"
      {...rest}
      className={cx(
        'form-radio checked:bg-[#00875F] focus:ring-[#00875F]',
        className,
      )}
    />
  )
}
