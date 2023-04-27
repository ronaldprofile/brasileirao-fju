import { useState } from 'react'
import { Button } from '@/components/Button'
import { FormBox } from '@/components/FormBox'
import { UploadTeamLogoModal } from '@/components/UploadTeamLogoModal'

export function StepTeamLogo() {
  const [modalOpen, setModalOpen] = useState(false)

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div>
      <FormBox>
        <Button outlined onClick={openModal}>
          Escolher escudo
        </Button>
      </FormBox>

      <UploadTeamLogoModal open={modalOpen} onOpenChange={closeModal} />
    </div>
  )
}
