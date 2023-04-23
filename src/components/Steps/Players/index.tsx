import { Button } from '@/components/Button'
import { FormBox } from '@/components/FormBox'
import { Input } from '@/components/Input'
import { Plus, X } from '@phosphor-icons/react'

import * as Dialog from '@radix-ui/react-dialog'
import { ButtonNextStep } from '../ButtonNextStep'
import { ChangeEvent, useState } from 'react'
import { ListPlayers } from './ListPlayers'

interface StepPlayersProps {
  handleNextStepForm: () => void
}

export interface Player {
  id: number
  name: string
  surname: string
  shirt: string
}

export function StepPlayers({ handleNextStepForm }: StepPlayersProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const [newPlayer, setNewPlayer] = useState({} as Player)

  function handleOnchangeInput(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name
    const value = e.target.value

    if (value.length === 0) {
      return
    }

    setNewPlayer((prevState) => ({
      ...prevState,
      id: players.length,
      [key]: value,
    }))
  }

  function handleSavePlayer() {
    setPlayers((prevState) => [...prevState, newPlayer])

    closeModal()
  }

  function handleOpenModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  const nextStepButtonDisabled = players.length === 0
  const newPlayerIsEmpty = Object.keys(newPlayer).length === 0

  return (
    <Dialog.Root open={modalOpen} onOpenChange={closeModal}>
      <FormBox>
        <div className="p-6 mb-4 border border-[#323228] rounded-md">
          <div className="flex justify-between items-center ">
            <strong className="text-[#E1E1E6] font-medium">
              Jogadores {players.length} de 5
            </strong>

            <Button
              onClick={handleOpenModal}
              className="flex items-center gap-2 text-sm bg-transparent border-2 border-[#00875F] hover:bg-[#00875f]"
            >
              Adicionar
              <Plus size={18} color="#fff" />
            </Button>
          </div>

          {players.length > 0 && <ListPlayers players={players} />}
        </div>

        <ButtonNextStep
          onNextStep={handleNextStepForm}
          disabled={nextStepButtonDisabled}
        />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-[0, 0, 0, 0.44] backdrop-blur-md fixed inset-0 w-screen h-screen" />
          <Dialog.Content className="w-full sm:max-w-xl bg-[#202024] border border-[#323238] absolute top-1/2 left-1/2 rounded-md p-8 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="font-extrabold text-2xl sm:text-3xl text-white">
              Novo jogador
            </Dialog.Title>

            <form className="w-full mt-8">
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-[#E1E1E6] text-sm" htmlFor="name">
                  Nome
                </label>

                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full"
                  placeholder="Neymar Júnior"
                  onChange={(e) => handleOnchangeInput(e)}
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-[#E1E1E6] text-sm" htmlFor="surname">
                  Apelido
                </label>

                <Input
                  type="text"
                  id="surname"
                  name="surname"
                  className="w-full"
                  placeholder="Menino Ney"
                  onChange={(e) => handleOnchangeInput(e)}
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-[#E1E1E6] text-sm" htmlFor="shirt">
                  Camisa
                </label>

                <Input
                  type="text"
                  id="shirt"
                  name="shirt"
                  className="w-full appearance-none"
                  placeholder="10"
                  onChange={(e) => handleOnchangeInput(e)}
                />
              </div>

              <Button
                // type="submit"
                onClick={handleSavePlayer}
                className="w-full font-bold"
                disabled={newPlayerIsEmpty}
              >
                Salvar
              </Button>
            </form>

            <Dialog.Close>
              <X
                size={20}
                className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 transition-colors"
                aria-label="Fechar modal"
              />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </FormBox>
    </Dialog.Root>
  )
}
