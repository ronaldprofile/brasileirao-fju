import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGetPlayerByUuid } from '@/hooks/get-player-by-uuid'
import { useTeams } from '@/hooks/get-teams-championship'
import { CustomSelect } from '@/components/Select'
import { ArrowLeft } from '@phosphor-icons/react'
import Skeleton from 'react-loading-skeleton'
import { ParsedUrlQuery } from 'querystring'
import { Button } from '@/components/Button'
import { toast } from 'react-toastify'
import { api } from '@/lib/axios'
import cx from 'clsx'

interface Option {
  value: string
  label: string
  image: string
}

type TeamOption = Option

interface PageQuery extends ParsedUrlQuery {
  id: string
}

const formatOptionLabel = ({ image, label }: any) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <img src={image} alt={label} className="w-6" />
      <span className="text-sm text-white">{label}</span>
    </div>
  )
}

export default function PlayerProfile() {
  const router = useRouter()

  const { id } = router.query as PageQuery
  const [playerId, setPlayerId] = useState<string>(id)

  const [teamOptionSelected, setTeamOptionSelected] = useState<TeamOption>({
    image: '',
    label: '',
    value: '',
  })

  const queryClient = useQueryClient()

  const { data: playerData, isLoading: playerIsLoadind } =
    useGetPlayerByUuid(playerId)

  const { data } = useTeams({ incompleteTeams: 1 })

  const { isLoading: mutationLoading, mutate } = useMutation(
    async (teamId: string) => await handleLinkPlayerToTeam(teamId),
    {
      onError: () => {
        toast.error('Algo deu errado')
      },

      onSuccess: () => {
        queryClient.invalidateQueries(['player', playerId])
        toast.success('Jogador vinculado')
      },
    },
  )

  async function handleLinkPlayerToTeam(teamId: string) {
    try {
      const data = {
        ...playerData?.player,
        teamId,
      }

      await api.put(`/players/update/${playerId}`, data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleSelectTeam(team: Option) {
    setTeamOptionSelected(team)
  }

  const options = data?.teams.map((team) => {
    return {
      label: team.name,
      value: team.uuid,
      image: team.shield,
    }
  })

  const playerHasTeam = playerData.player.team
  const disableButton = !teamOptionSelected

  useEffect(() => {
    setPlayerId(id)
  }, [id])

  return (
    <div className="h-full w-full flex justify-center items-center">
      {playerIsLoadind ? (
        <div
          className={cx('w-full mx-4', {
            'max-w-lg': playerHasTeam,
            'max-w-3xl grid grid-cols-2 gap-3': !playerHasTeam,
          })}
        >
          <div className="bg-[#202024] border border-[#323238] rounded-md">
            <div className="p-6">
              <div className="flex flex-col items-center gap-3">
                <Skeleton width={160} height={160} circle />

                <Skeleton width={100} />
              </div>

              <div className="mt-6">
                <Skeleton width={90} />

                <div className="flex items-center gap-2">
                  <Skeleton width={120} height={24} />
                  <Skeleton circle width={24} height={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="self-start bg-[#202024] border border-[#323238] rounded-md">
            <div className="p-6">
              <Skeleton width={250} />

              <div className="mt-6 flex items-stretch gap-4">
                <Skeleton height={38} width={200} />
                <Skeleton height={38} width={100} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cx('w-full mx-4', {
            'max-w-lg': playerHasTeam,
            'max-w-3xl grid grid-cols-2 gap-3': !playerHasTeam,
          })}
        >
          <div className="w-full bg-[#202024] border border-[#323238] rounded-md">
            <div className="p-6">
              {playerIsLoadind ? (
                <>
                  <div className="flex flex-col items-center gap-3">
                    <Skeleton width={160} height={160} circle />

                    <Skeleton width={100} />
                  </div>

                  <div className="mt-6">
                    <Skeleton width={90} />

                    <div className="flex items-center gap-2">
                      <Skeleton width={120} height={24} />
                      <Skeleton circle width={24} height={24} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={playerData?.player.avatar}
                      alt={playerData?.player.name}
                      className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-full"
                    />

                    <strong className="text-xl sm:text-2xl">
                      {playerData?.player.name}
                    </strong>
                  </div>

                  <div className="mt-6">
                    <div>
                      <span className="text-sm text-[#a9a9b2]">
                        Equipe atual
                      </span>

                      {playerHasTeam ? (
                        <div>
                          <a
                            href="#"
                            className="flex items-center gap-2 text-[#a9a9b2] hover:underline underline-offset-2 decoration-current transition"
                          >
                            {playerHasTeam?.name}
                            <img
                              src={playerHasTeam?.shield}
                              alt={playerHasTeam?.name}
                              className="w-6"
                            />
                          </a>
                        </div>
                      ) : (
                        <div>
                          <span>Sem clube</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {!playerHasTeam && (
            <div className="self-start bg-[#202024] sm:mx-0 border border-[#323238] rounded-md">
              <div className="p-6">
                <span className="text-sm text-[#a9a9b2]">
                  Você pode vincular o jogador à um time
                </span>

                <div className="mt-6 flex items-stretch gap-4">
                  <CustomSelect
                    className="w-full"
                    options={options ?? []}
                    value={teamOptionSelected}
                    onChange={(option) => handleSelectTeam(option as Option)}
                    formatOptionLabel={formatOptionLabel}
                    placeholder="Escolha um time"
                  />

                  <Button
                    onClick={() => mutate(teamOptionSelected.value)}
                    className="h-[38px]"
                    disabled={disableButton || mutationLoading}
                  >
                    {mutationLoading ? 'Vinculando...' : 'Vincular'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={router.back}
        className="absolute top-8 left-6 w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center hover:bg-[#323238] rounded-md"
      >
        <ArrowLeft size={24} color="#fff" />
      </button>
    </div>
  )
}
