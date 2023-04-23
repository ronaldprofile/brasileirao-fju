import { useState } from 'react'

import { FormBox } from '@/components/FormBox'
import { Input } from '@/components/Input'
import { ButtonNextStep } from '../ButtonNextStep'

interface StepTeamProps {
  handleNextStepForm: () => void
}

export function StepTeam({ handleNextStepForm }: StepTeamProps) {
  const [team, setTeam] = useState<string | null>(null)

  const nextStepButtonDisabled = !team

  return (
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

        <ButtonNextStep
          onNextStep={handleNextStepForm}
          disabled={nextStepButtonDisabled}
        />
      </FormBox>
    </div>
  )
}
