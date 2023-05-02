import { ArrowLeft } from '@phosphor-icons/react'
import { titles } from './data'

interface HeadingProps {
  currentStep: number
  onPreviousStepForm: () => void
}

export function Heading({ currentStep, onPreviousStepForm }: HeadingProps) {
  const renderTitle = titles[currentStep as keyof typeof titles]

  return (
    <div className="flex flex-col">
      {currentStep > 1 && (
        <button
          onClick={onPreviousStepForm}
          className="mb-8 w-8 h-8 flex justify-center items-center hover:bg-[#323238] rounded-md transition-colors"
        >
          <ArrowLeft size={18} color="#fff" />
        </button>
      )}

      <h1 className="text-white font-bold text-2xl leading-9">
        {renderTitle.title}
      </h1>

      <p className="text-[#A9A9B2] leading-6 sm:tracking-wide">
        {renderTitle.description}
      </p>
    </div>
  )
}
