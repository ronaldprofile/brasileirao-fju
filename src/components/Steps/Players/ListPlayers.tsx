import { Player } from '.'

interface ListPlayersProps {
  players: Player[]
}

export function ListPlayers({ players }: ListPlayersProps) {
  return (
    <div className="mt-6">
      <ul>
        {players.map((player) => {
          return (
            <li key={player.id} className="list-inside">
              <span className="text-[#E1E1E6] text-sm">{player.name},</span>

              <span className="text-[#E1E1E6] text-sm">
                {'  '} camisa {player.shirt}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
