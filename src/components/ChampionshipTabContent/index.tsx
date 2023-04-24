import { TabsOptions } from '@/@types/tab.options'

interface ChampionshipTabContentProps {
  tabActive: TabsOptions
}

const teams = ['Acarape City', 'São Benedito', 'FC Bom de bola']

export function ChampionshipTabContent({
  tabActive,
}: ChampionshipTabContentProps) {
  return (
    <div className="w-full max-w-3xl h-12 mx-auto">
      {tabActive === 'classification' && (
        <>
          <div className="pt-3 px-4 pb-2 flex flex-col bg-[#202024] border-b border-b-[#323238]">
            <span className="text-xs text-[#A9A9B2]">Temporada</span>
            <span className="text-sm text-white font-black">2022-23</span>
          </div>

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
              {teams.map((team) => {
                return (
                  <tr
                    key={team}
                    className="h-10 hover:bg-[#323238] transition-colors"
                  >
                    <td className="pl-4 text-sm text-[#A9A9B2]">{team}</td>
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
        </>
      )}
    </div>
  )
}
