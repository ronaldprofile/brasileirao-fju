import { useState } from 'react'
import { FormSteps } from '../FormSteps'
import { StepTeam } from './Team'
import { StepPlayers } from './Players'
import { Heading } from './Heading'
import { StepTeamLogo } from './TeamLogo'

export function Steps() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = 3

  const handleNextStepForm = () => {
    if (currentStep < steps) {
      setCurrentStep((prevState) => prevState + 1)
    }
  }

  const handlePreviousStepForm = () => {
    if (currentStep > 1) {
      setCurrentStep((prevState) => prevState - 1)
    }
  }

  function renderStepForm(stepIndex: number) {
    switch (stepIndex) {
      case 1:
        return <StepTeam handleNextStepForm={handleNextStepForm} />

      case 2:
        return <StepPlayers handleNextStepForm={handleNextStepForm} />

      case 3:
        return <StepTeamLogo />
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#121214]">
      <div className="w-full p-6 sm:max-w-xl sm:p-0">
        <Heading
          currentStep={currentStep}
          onPreviousStepForm={handlePreviousStepForm}
        />

        <FormSteps size={steps} currentStep={currentStep} className="my-6" />

        {renderStepForm(currentStep)}
      </div>
    </div>
  )
}
