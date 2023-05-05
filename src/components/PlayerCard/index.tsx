import { Shield } from '@phosphor-icons/react'
import Image from 'next/image'

interface Team {
  name: string
  shield: string
}

interface Player {
  uuid: string
  name: string
  nickname: string
  shirtNumber: string
  avatar: string

  team: Team | null
}

interface PlayerCardProps {
  player: Player
  modeShow: 'championship' | 'team'
}

export function PlayerCard({ player, modeShow }: PlayerCardProps) {
  const team = player.team

  const words = team ? team.name.split(' ') : []
  const formattedTeamName =
    words.length === 2 ? words[1] : team ? team.name : 'Sem clube'

  const teamName = formattedTeamName
  const teamShield = player.team?.shield

  return (
    <div className="h-full flex flex-col border border-[#323238] rounded-md cursor-pointer group">
      <Image
        className="w-full rounded-t h-[100px] object-cover group-hover:scale-105 transition-transform"
        height={100}
        width={100}
        loading="lazy"
        src={player.avatar}
        alt={player.name}
      />

      <div className="p-2 flex flex-1 flex-col justify-end gap-1 text-[#a9a9b2]">
        <span className="block max-w-[80px] text-sm overflow-hidden text-ellipsis">
          {player.name}
        </span>

        {modeShow === 'championship' ? (
          <span className="flex items-center gap-1 text-xs">
            {teamShield ? (
              <img src={teamShield} alt={teamName} className="w-6 h-6" />
            ) : (
              <Shield size={16} />
            )}

            {teamName}
          </span>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  )
}
