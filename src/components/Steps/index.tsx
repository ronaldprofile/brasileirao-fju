import { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { FormSteps } from '../FormSteps'
import { StepTeam } from './Team'
import { StepPlayers } from './Players'
import { Heading } from './Heading'
import { StepTeamLogo } from './TeamLogo'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatAcronymTeam } from '@/utils/format-acronym-team'
import {
  createTeamFormData,
  createTeamFormDataInputs,
  createTeamFormSchema,
} from '@/schemas/create/team'
import { api } from '@/lib/axios'
import { toast } from 'react-toastify'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'

export function Steps() {
  const [currentStep, setCurrentStep] = useState(1)

  const createTeamForm = useForm<createTeamFormData>({
    resolver: zodResolver(createTeamFormSchema),
  })

  const { handleSubmit, reset } = createTeamForm

  async function handleCreateTeam(data: createTeamFormDataInputs) {
    const id = getChampionshipIdCookie()

    const createTeam = {
      name: data.name,
      shield: data.shield,
      acronym: formatAcronymTeam(data.name),
      playersIds: data.playersIds,
      championshipId: id,
    }

    try {
      const res = await api.post('/teams/new', createTeam, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success(res.data.message)
      reset()

      setCurrentStep(1)
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado')
    }
  }

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

        <FormProvider {...createTeamForm}>
          <form
            onSubmit={handleSubmit(handleCreateTeam)}
            encType="multipart/form-data"
          >
            {renderStepForm(currentStep)}
          </form>
        </FormProvider>
      </animated.div>
    </div>
  )
}
