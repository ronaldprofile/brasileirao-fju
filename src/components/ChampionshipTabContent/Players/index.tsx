import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Shield } from '@phosphor-icons/react'

interface Player {
  id: string
  name: string
  nickname: string
  shirtNumber: string
  avatar: string
}

export function Players() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    async function getPlayers() {
      const response = await api.get<{ data: Player[] }>('players')

      const { data: allPlayers } = response.data
      setPlayers(allPlayers)
    }

    getPlayers()
  }, [])

  return (
    <div className="bg-[#202024]">
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 px-2 pt-2 pb-10">
        {players.map((player) => {
          return (
            <div key={player.id} className="border border-[#323238] rounded-md">
              <img
                className="w-full rounded-t"
                src={player.avatar}
                alt={player.name}
              />

              <div className="p-2 flex flex-col gap-1 text-[#a9a9b2]">
                <span className="block max-w-[58px] text-sm overflow-hidden text-ellipsis">
                  {player.name}
                </span>

                <span className="flex items-center gap-2 text-xs">
                  <Shield size={16} />
                  FJU
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
