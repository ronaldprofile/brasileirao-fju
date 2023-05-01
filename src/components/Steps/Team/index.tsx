import { FormBox } from '@/components/FormBox'
import { Input } from '@/components/Input'
import { ButtonNextStep } from '../ButtonNextStep'
import { useFormContext } from 'react-hook-form'
import { createTeamFormData } from '@/schemas/team'

interface StepTeamProps {
  handleNextStepForm: () => void
}

export function StepTeam({ handleNextStepForm }: StepTeamProps) {
  const { register, formState, watch } = useFormContext<createTeamFormData>()

  const { errors } = formState

  const team = watch('name', '')
  const nextStepButtonDisabled = team.length === 0

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
            className="w-full"
            placeholder="Barcelona"
            {...register('name')}
            error={errors.name?.message}
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
