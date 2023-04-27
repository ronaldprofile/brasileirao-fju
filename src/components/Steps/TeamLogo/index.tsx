import { Button } from '@/components/Button'
import { FormBox } from '@/components/FormBox'
import { UploadTeamLogoModal } from '@/components/UploadTeamLogoModal'

export function StepTeamLogo() {
  return (
    <div>
      <FormBox>
        <UploadTeamLogoModal>
          <Button outlined>Escolher escudo</Button>
        </UploadTeamLogoModal>
      </FormBox>
    </div>
  )
}
