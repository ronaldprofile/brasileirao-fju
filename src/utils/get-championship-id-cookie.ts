import { parseCookies } from 'nookies'

export function getChampionshipIdCookie() {
  const cookies = parseCookies()

  const championshipId = cookies['@championship:id']

  return championshipId
}
