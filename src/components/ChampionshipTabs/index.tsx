import { TabActiveLink } from '../TabActiveLink'

export function ChampionshipTabs() {
  return (
    <nav className="w-full max-w-3xl h-12 mx-auto">
      <ul className="h-full grid grid-cols-4">
        <TabActiveLink href={'/championship'}>
          <li>Partidas</li>
        </TabActiveLink>

        <TabActiveLink href={'/championship/table'}>
          <li>Classificações</li>
        </TabActiveLink>

        <TabActiveLink href={'/championship/statistics'}>
          <li>Estastísticas</li>
        </TabActiveLink>

        <TabActiveLink href={'/championship/players'}>
          <li>Jogadores</li>
        </TabActiveLink>
      </ul>
    </nav>
  )
}
