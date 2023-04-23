import { Button, ButtonProps } from '@/components/Button'
import { ArrowRight } from '@phosphor-icons/react'

interface ButtonNextStepProps extends ButtonProps {
  onNextStep: () => void
}

export function ButtonNextStep({
  onNextStep,
  disabled,
  ...rest
}: ButtonNextStepProps) {
  return (
    <Button
      {...rest}
      type="button"
      onClick={onNextStep}
      disabled={disabled}
      className="w-full flex justify-center items-center gap-4"
    >
      Próximo passo
      <ArrowRight size={18} />
    </Button>
  )
}
