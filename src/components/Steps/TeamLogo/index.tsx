import { FormBox } from '@/components/FormBox'
import { AreaUploadFile } from '@/components/AreaUploadFile'
import { Button } from '@/components/Button'
import { useFormContext } from 'react-hook-form'
import { createTeamFormData } from '@/schemas/team'

export function StepTeamLogo() {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<createTeamFormData>()

  const watchUploadFile: FileList = watch('shield', null)
  const teamColorHighlight = watch('teamColorHighlight', '')

  const teamColorHighlightIsEmpty = teamColorHighlight?.length === 0
  const havePhotoSelected = watchUploadFile?.length > 0

  const buttonDisabled = !havePhotoSelected || teamColorHighlightIsEmpty

  return (
    <div>
      <FormBox>
        <AreaUploadFile label="shield" title="Logo do time" />

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={buttonDisabled || isSubmitting}
        >
          Salvar
        </Button>
      </FormBox>
    </div>
  )
}
