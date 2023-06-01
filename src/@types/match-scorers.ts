interface Player {
  uuid: string
  name: string
  shirtNumber: string
  avatar: string
  nickname: string
  teamId: string
  statisticId: string
}

export interface MatchScorers {
  homeTeam: Array<{
    player: Player
    score: number
  }> | null

  awayTeam: Array<{
    player: Player
    score: number
  }> | null
}
