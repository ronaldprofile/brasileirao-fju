import { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { FormSteps } from '../FormSteps'
import { StepTeam } from './Team'
import { StepPlayers } from './Players'
import { Heading } from './Heading'
import { StepTeamLogo } from './TeamLogo'

export function Steps() {
  const [currentStep, setCurrentStep] = useState(3)

  const steps = 3

  const [contentProps, setContentProps] = useSpring(() => ({
    from: { opacity: 0, x: -200 },
    to: { opacity: 1, x: 0 },
    config: { duration: 1000 },
  }))

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

  useEffect(() => {
    setContentProps({
      reset: true,
      reverse: currentStep < 1 || currentStep > steps,
    })
  }, [currentStep, setContentProps])

  return (
    <div className="h-screen w-screen flex justify-center items-center  bg-[#121214]">
      <animated.div
        className="w-full p-6 sm:max-w-xl sm:p-0"
        style={{
          ...contentProps,
        }}
      >
        <Heading
          currentStep={currentStep}
          onPreviousStepForm={handlePreviousStepForm}
        />

        <FormSteps size={steps} currentStep={currentStep} className="my-6" />

        {renderStepForm(currentStep)}
      </animated.div>
    </div>
  )
}
