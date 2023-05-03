export function formatAcronymTeam(teamName: string) {
  let acronym = ''

  const words = teamName.split(' ')

  if (words.length === 1) {
    acronym = teamName.substring(0, 3)
  } else if (words.length >= 2) {
    acronym = words[0].substring(0, 1) + words[1].substring(0, 2)
  }

  return acronym.toUpperCase()
}
