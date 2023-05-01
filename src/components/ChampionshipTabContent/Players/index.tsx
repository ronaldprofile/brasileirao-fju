import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { CircleNotch, Shield } from '@phosphor-icons/react'
import cx from 'clsx'

interface Team {
  name: string
  shield: string
}

interface Player {
  id: string
  name: string
  nickname: string
  shirtNumber: string
  avatar: string

  team: Team | null
}

export function Players() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getPlayers() {
      setIsLoading(true)

      const response = await api.get<{ data: Player[] }>('players')

      const { data: allPlayers } = response.data
      setPlayers(allPlayers)

      setIsLoading(false)
    }

    getPlayers()
  }, [])

  return (
    <div
      className={cx('bg-[#202024]', {
        'flex justify-center items-center': isLoading,
      })}
    >
      {isLoading ? (
        <div className="p-2  text-white">
          <CircleNotch size={24} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 px-2 pt-2 pb-10">
          {players.map((player) => {
            return (
              <div
                key={player.id}
                className="flex flex-col border border-[#323238] rounded-md"
              >
                <img
                  className="w-full rounded-t h-[100px] object-cover"
                  src={player.avatar}
                  alt={player.name}
                />

                <div className="p-2 flex flex-1 flex-col justify-end gap-1 text-[#a9a9b2]">
                  <span className="block max-w-[58px] text-sm overflow-hidden text-ellipsis">
                    {player.name}
                  </span>

                  <span className="flex items-center gap-2 text-xs">
                    {player.team?.shield ? (
                      <img
                        src={player.team.shield}
                        alt={player.team.name}
                        className="w-6 h-6"
                      />
                    ) : (
                      <Shield size={16} />
                    )}

                    {player.team?.name ?? 'Sem clube'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
