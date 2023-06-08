import { useState } from 'react'
import { FormBox } from '@/components/FormBox'
import { CircleNotch, MagnifyingGlass } from '@phosphor-icons/react'
import { ButtonNextStep } from '../ButtonNextStep'
import { Input } from '@/components/Input'
import { useForm, useFormContext } from 'react-hook-form'
import { api } from '@/lib/axios'
import cx from 'clsx'
import { createTeamFormData } from '@/schemas/create/team'
import { toast } from 'react-toastify'

interface StepPlayersProps {
  handleNextStepForm: () => void
}

interface Player {
  uuid: string
  name: string
  nickname: string
  shirtNumber: string
  avatar: string
}

export function StepPlayers({ handleNextStepForm }: StepPlayersProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [playersSelected, setPlayersSelected] = useState<Player[]>([])

  const playersIds = playersSelected.map((player) => player.uuid)

  const nextStepButtonDisabled = playersIds.length < 1

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm()

  const {
    register: registerContext,
    formState: formStateContext,
    watch: watchContext,
    setValue: setValueContext,
  } = useFormContext<createTeamFormData>()

  const playersIdsForm = watchContext('playersIds')

  const { errors: errorsContext } = formStateContext

  async function handleSearchPlayer(data: any) {
    try {
      const response = await api.get<{ data: Player[] }>('/search', {
        params: {
          find: data.find,
        },
      })

      const searchResults = response.data

      if (searchResults.data.length === 0) {
        toast.error('Nenhum jogador encontrado')
      } else {
        setPlayers(searchResults.data)
      }

      reset()
    } catch (error) {
      console.log(error)
      toast.error('Erro no servidor')
    }
  }

  function handleSelectPlayerToTeam(player: Player) {
    const playerAlreadyExists = playersSelected.some(
      (playerItem) => playerItem.uuid === player.uuid,
    )

    if (!playerAlreadyExists) {
      setPlayersSelected((prevState) => [...prevState, player])
      handleAddNewPlayerId(player.uuid)
      return
    }

    const updateListPlayersSelected = playersSelected.filter(
      (playerIdItem) => playerIdItem.uuid !== player.uuid,
    )

    handleRemovePlayerId(player.uuid)

    setPlayersSelected(updateListPlayersSelected)
  }

  function handleAddNewPlayerId(playerId: string) {
    setValueContext('playersIds', [...playersIdsForm, playerId])
  }

  function handleRemovePlayerId(playerId: string) {
    const listUpdated = playersIdsForm.filter(
      (playerIdItem) => playerIdItem !== playerId,
    )

    setValueContext('playersIds', [...listUpdated])
  }

  return (
    <FormBox>
      <div className="p-6 mb-4 border border-[#323228] rounded-md">
        <div className="flex justify-between items-center">
          <strong className="text-[#E1E1E6] font-medium">
            Jogadores {playersSelected.length} de 5
          </strong>

          <div className="flex items-center justify-center">
            {playersSelected.map((player) => {
              return (
                <div
                  key={player.uuid}
                  className="flex items-center justify-center w-11 h-11 -mx-2 overflow-hidden rounded-full border-2 border-white shadow-md"
                >
                  <img src={player.avatar} alt={player.name} />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Input
            placeholder="Busque por um jogador"
            className="w-full"
            {...register('find', {
              required: { value: true, message: 'Preencha o nome do jogador' },
            })}
          />

          <button
            type="button"
            onClick={handleSubmit(handleSearchPlayer)}
            className="h-12 w-14 group hover:bg-[#00875F] border border-[#00875F] focus:outline-none flex items-center justify-center rounded-md transition-colors"
          >
            <MagnifyingGlass
              size={20}
              className="text-[#00875F] group-hover:text-white"
            />
          </button>
        </div>

        {isSubmitting ? (
          <div className="p-4 text-white flex items-center justify-center">
            <CircleNotch size={24} className="animate-spin" />
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap gap-2">
            {players.map((player) => {
              const playerIsSelected = playersSelected.some(
                (playerItem) => playerItem.uuid === player.uuid,
              )

              return (
                <div
                  key={player.uuid}
                  onClick={() => handleSelectPlayerToTeam(player)}
                  className={cx(
                    'min-w-[100px] p-3 flex flex-1 flex-col items-center gap-2 border  rounded-md cursor-pointer hover:border-[#00875F] transition-colors',
                    {
                      'border-[#323238]': !playerIsSelected,
                      'border-[#00875F]': playerIsSelected,
                    },
                  )}
                >
                  <img
                    src={player.avatar}
                    alt={player.name}
                    loading="lazy"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />

                  <span className="text-[#a9a9b2] text-sm">{player.name}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Input type="hidden" {...registerContext('playersIds')} />

      <div className="text-white my-3">
        {errorsContext.playersIds && errorsContext.playersIds.message}
      </div>

      <ButtonNextStep
        onNextStep={handleNextStepForm}
        disabled={nextStepButtonDisabled}
      />
    </FormBox>
  )
}
