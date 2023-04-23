import { ArrowRight } from '@phosphor-icons/react'

import { Button } from '@/components/Button'
import { FormBox } from '@/components/FormBox'
import { FormSteps } from '@/components/FormSteps'
import { Input } from '@/components/Input'
import { useState } from 'react'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)

  const [team, setTeam] = useState<string | null>(null)

  const handleNextStepForm = () => setCurrentStep((prevState) => prevState + 1)

  const nextStepButtonDisabled = !team
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#121214]">
      <div className="w-full max-w-xl">
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-2xl leading-9">
            Bem vindo ao brasileirão da força jovem universal
          </h1>

          <p className="text-[#A9A9B2] leading-6 tracking-wide">
            Precisamos de algumas informações para criar seu time! Ah, você pode
            editar essas informações depois.
          </p>
        </div>

        <FormSteps size={4} currentStep={currentStep} className="my-6" />

        <div>
          <FormBox>
            <div className="mb-4 flex flex-col gap-2">
              <label className="text-[#E1E1E6] text-sm" htmlFor="team">
                Nome do time
              </label>

              <Input
                type="text"
                id="team"
                onChange={(e) => setTeam(e.target.value)}
                className="w-full"
                placeholder="Barcelona"
              />
            </div>

            <Button
              type="button"
              onClick={handleNextStepForm}
              disabled={nextStepButtonDisabled}
              className="w-full flex justify-center items-center gap-4"
            >
              Próximo passo
              <ArrowRight size={18} />
            </Button>
          </FormBox>
        </div>
      </div>
    </div>
  )
}
