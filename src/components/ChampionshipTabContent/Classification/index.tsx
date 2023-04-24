import { teams } from '@/utils/team'

export function Classification() {
  return (
    <div>
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
            <th className="uppercase text-center text-[#a9a9b2] text-xs">Pj</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">
              Vit
            </th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">E</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">
              DER
            </th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">Gm</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">Gs</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">sg</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#323238]">
          {teams.map((team, index) => {
            const position = index + 1

            return (
              <tr
                key={team}
                className="h-10 hover:bg-[#323238] transition-colors"
              >
                <td className="pl-4 text-sm text-[#A9A9B2]">
                  <span>{position}</span>
                  <span className="ml-2">{team}</span>
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
    </div>
  )
}
