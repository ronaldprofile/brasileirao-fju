import { useState } from 'react'
import { Button } from '@/components/Button'
import { FormBox } from '@/components/FormBox'
import { Plus } from '@phosphor-icons/react'

import { ButtonNextStep } from '../ButtonNextStep'
import { ListPlayers } from './ListPlayers'

import { NewPlayerModal } from '@/components/NewPlayerModal'
import { Player } from '@/@types/player'

interface StepPlayersProps {
  handleNextStepForm: () => void
}

export function StepPlayers({ handleNextStepForm }: StepPlayersProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])

  function handleSavePlayer(newPlayer: Player) {
    setPlayers((prevState) => [...prevState, newPlayer])

    closeModal()
  }

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  const nextStepButtonDisabled = players.length < 5

  return (
    <>
      <FormBox>
        <div className="p-6 mb-4 border border-[#323228] rounded-md">
          <div className="flex justify-between items-center ">
            <strong className="text-[#E1E1E6] font-medium">
              Jogadores {players.length} de 5
            </strong>

            <Button
              onClick={openModal}
              outlined
              className="flex justify-center items-center gap-2"
            >
              Adicionar
              <Plus size={18} color="#fff" className="hidden sm:block" />
            </Button>
          </div>

          {players.length > 0 && <ListPlayers players={players} />}
        </div>

        <ButtonNextStep
          onNextStep={handleNextStepForm}
          disabled={nextStepButtonDisabled}
        />
      </FormBox>

      <NewPlayerModal
        open={modalOpen}
        onOpenChange={closeModal}
        listPlayers={players}
        onAddPlayer={handleSavePlayer}
      />
    </>
  )
}
