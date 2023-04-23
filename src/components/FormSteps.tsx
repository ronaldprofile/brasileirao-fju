import cx from 'clsx'

interface FormStepsPorps {
  size: number
  currentStep?: number
  className?: string
}

export function FormSteps({
  size,
  currentStep = 1,
  className,
}: FormStepsPorps) {
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label className="text-[#A9A9B2] text-xs" htmlFor="step">
        Passo {currentStep} de {size}
      </label>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gap: 4,
        }}
      >
        {Array.from({ length: size }, (_, index) => {
          const position = index + 1

          return (
            <div
              key={position}
              className={cx('h-1 rounded-[1px]', {
                'bg-[#E1E1E6]': currentStep >= position,
                'bg-[#323238]': currentStep < position,
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
