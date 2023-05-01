import { api } from '@/lib/axios'
import { CircleNotch } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string
}

export function Classification() {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getTeams() {
      setIsLoading(true)

      const { data: teamsList } = await api.get<{ data: Team[] }>('/teams')
      const teams = teamsList.data

      setTeams(teams)
      setIsLoading(false)
    }

    getTeams()
  }, [])

  return (
    <div>
      <div className="pt-3 px-4 pb-2 flex flex-col bg-[#202024] border-b border-b-[#323238]">
        <span className="text-xs text-[#A9A9B2]">Temporada</span>
        <span className="text-sm text-white font-black">2022-23</span>
      </div>

      <div className="mt-2 bg-[#202024]">
        {isLoading ? (
          <div className="p-2 text-white flex items-center justify-center">
            <CircleNotch size={24} className="animate-spin" />
          </div>
        ) : (
          <table className="w-full mt-2 bg-[#202024]">
            <thead className="border-b border-b-[#323238]">
              <tr className="h-8">
                <th className="pl-4 text-left text-xs text-[#a9a9b2]">Clube</th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  Pts
                </th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  Pj
                </th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  Vit
                </th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  E
                </th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  DER
                </th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  Gm
                </th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  Gs
                </th>
                <th className="uppercase text-center text-[#a9a9b2] text-xs">
                  sg
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#323238]">
              {teams.map((team, index) => {
                const position = index + 1

                return (
                  <tr
                    key={team.uuid}
                    className="h-10 hover:bg-[#323238] transition-colors"
                  >
                    <td className="h-10 pl-4 flex items-center gap-3 text-sm text-[#A9A9B2]">
                      <span>{position}</span>
                      <img src={team.shield} alt="" className="w-6 h-6" />
                      <span className="ml-2">{team.name}</span>
                    </td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                    <td className="text-sm text-center text-[#A9A9B2]">0</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
