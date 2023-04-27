import React, { ChangeEvent, useState } from 'react'

import {
  Modal as ModalComponent,
  ModalProps,
  ModalWrapper,
  ModalTitle,
} from '../Modal'
import { Input } from '../Input'
import { Button } from '../Button'
import { Player } from '@/@types/player'

interface NewPlayerModalProps extends ModalProps {
  listPlayers: Player[]
  onAddPlayer: (newPlayer: Player) => void
}

export function NewPlayerModal({
  open,
  onOpenChange,
  listPlayers,
  onAddPlayer,
}: NewPlayerModalProps) {
  const [newPlayer, setNewPlayer] = useState({} as Player)

  function handleOnchangeInput(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name
    const value = e.target.value

    if (value.length === 0) {
      return
    }

    setNewPlayer((prevState) => ({
      ...prevState,
      id: listPlayers.length,
      [key]: value,
    }))
  }

  function savePlayer() {
    onAddPlayer(newPlayer)

    clearFields()
  }

  function clearFields() {
    setNewPlayer({
      id: 0,
      name: '',
      shirt: '',
      surname: '',
    })
  }

  const newPlayerIsEmpty = Object.keys(newPlayer).length === 0

  return (
    <ModalComponent open={open} onOpenChange={onOpenChange}>
      <ModalWrapper>
        <ModalTitle>Novo jogador</ModalTitle>

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
            type="button"
            onClick={savePlayer}
            className="w-full font-bold"
            disabled={newPlayerIsEmpty}
          >
            Salvar
          </Button>
        </form>
      </ModalWrapper>
    </ModalComponent>
  )
}
