// import { useEffect } from 'react'
// import { teams } from '@/utils/team'

import { Shield } from '@phosphor-icons/react'

const arr = [1, 2, 3, 4]

export function Matches() {
  const currentRound = 1

  // const matches: any[] = []

  // function sortMatch() {
  //   for (
  //     let firstTeamIndex = 0;
  //     firstTeamIndex < teams.length;
  //     firstTeamIndex++
  //   ) {
  //     for (
  //       let secondTeamIndex = firstTeamIndex + 1;
  //       secondTeamIndex < teams.length;
  //       secondTeamIndex++
  //     ) {
  //       matches.push([teams[firstTeamIndex], teams[secondTeamIndex]])
  //     }
  //   }
  // }

  // useEffect(() => {
  //   sortMatch()
  // }, [])

  return (
    <div>
      <div className="pt-3 px-4 pb-2 flex flex-col bg-[#202024] border-b border-b-[#323238]">
        <span className="text-sm text-[#A9A9B2]">
          Rodada {currentRound} de 8
        </span>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 divide-x divide-y divide-[#323238]">
          {arr.map((match) => (
            <div
              key={match}
              className="h-32 px-6 py-4 bg-[#202024] flex items-center justify-between cursor-pointer hover:bg-[#323238]/60 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-3 text-sm text-[#a9a9b2]">
                  <Shield size={24} />
                  São Benedito
                </span>
                <span className="flex items-center gap-3 text-sm text-[#a9a9b2]">
                  <Shield size={24} />
                  Fju Oficial
                </span>
              </div>

              <div className="h-full pl-4 flex flex-col items-center justify-center border-l-[1.2px] border-l-[#323238] ">
                <span className="text-xs text-[#a9a9b2]">Sáb., 29/04</span>
                <span className="text-xs text-[#a9a9b2]">16:30</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
