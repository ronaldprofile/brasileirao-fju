import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { api } from '@/lib/axios'
import { useGetPlayerByUuid } from '@/hooks/get-player-by-uuid'
import { useTeams } from '@/hooks/get-teams-championship'
import { Button } from '@/components/Button'
import { ArrowLeft } from '@phosphor-icons/react'
import { CustomSelect } from '@/components/Select'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

interface Option {
  value: string
  label: string
  image: string
}

type TeamOption = Option | null

interface PageQuery extends ParsedUrlQuery {
  id: string
}

const formatOptionLabel = ({ image, label }: any) => {
  return (
    <div className="flex items-center gap-3">
      <img src={image} alt={label} className="w-6" />
      <span>{label}</span>
    </div>
  )
}

export default function PlayerProfile() {
  const router = useRouter()

  const { id } = router.query as PageQuery
  const [playerId, setPlayerId] = useState<string>(id)

  const [teamOptionSelected, setTeamOptionSelected] = useState<TeamOption>(null)

  const { player, isLoading: playerIsLoadind } = useGetPlayerByUuid(playerId)
  const { teams } = useTeams({ incompleteTeams: 1 })

  const handleSelectTeam = (team: Option) => setTeamOptionSelected(team)

  async function handleLinkPlayerToTeam() {
    try {
      if (teamOptionSelected) {
        const data = {
          ...player,
          teamId: teamOptionSelected.value,
        }

        await api.put(`/players/update/${playerId}`, data)
        toast.success('Jogador vinculado')
      }
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado')
    }
  }

  const options = teams.map((team) => {
    return {
      label: team.name,
      value: team.uuid,
      image: team.shield,
    }
  })

  useEffect(() => {
    setPlayerId(id)
  }, [id])

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-full max-w-lg mx-4 sm:mx-0 bg-[#202024] border border-[#323238] rounded-md">
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
                  src={player.avatar}
                  alt={player.name}
                  className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-full"
                />

                <strong className="text-xl sm:text-2xl">{player.name}</strong>
              </div>

              <div className="mt-6">
                <div>
                  <span className="text-sm text-[#a9a9b2]">Equipe atual</span>

                  {player.team ? (
                    <div>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-[#a9a9b2] hover:underline underline-offset-2 decoration-current transition"
                      >
                        {player.team.name}
                        <img
                          src={player.team.shield}
                          alt={player.team.name}
                          className="w-6"
                        />
                      </a>
                    </div>
                  ) : (
                    <div>
                      <span>Sem clube</span>

                      <div className="mt-6 flex items-stretch gap-4">
                        <CustomSelect
                          className="w-full"
                          options={options}
                          value={teamOptionSelected}
                          onChange={(option) =>
                            handleSelectTeam(option as Option)
                          }
                          formatOptionLabel={formatOptionLabel}
                          placeholder="Escolha um time"
                        />

                        <Button onClick={handleLinkPlayerToTeam}>
                          Vincular
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
