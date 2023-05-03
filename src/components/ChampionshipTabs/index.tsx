import cx from 'clsx'
import { TabActiveLink } from '../TabActiveLink'

import styles from './styles.module.css'

export function ChampionshipTabs() {
  return (
    <nav className="w-full max-w-3xl h-12 mx-auto">
      <ul className="h-full grid grid-cols-4">
        <TabActiveLink href={'/championship'} className={cx(styles.tab)}>
          <li>Partidas</li>
        </TabActiveLink>

        <TabActiveLink href={'/championship/table'} className={cx(styles.tab)}>
          <li>Classificações</li>
        </TabActiveLink>

        <TabActiveLink
          href={'/championship/statistics'}
          className={cx(styles.tab)}
        >
          <li>Estastísticas</li>
        </TabActiveLink>

        <TabActiveLink
          href={'/championship/players'}
          className={cx(styles.tab)}
        >
          <li>Jogadores</li>
        </TabActiveLink>
      </ul>
    </nav>
  )
}
