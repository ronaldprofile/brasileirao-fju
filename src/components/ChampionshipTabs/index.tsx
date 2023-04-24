import cx from 'clsx'
import styles from './styles.module.css'
import { TabsOptions } from '@/@types/tab.options'

interface ChampionshipTabsProps {
  tabActive: TabsOptions
  onChangeTabActive: (tab: TabsOptions) => void
}

export function ChampionshipTabs({
  onChangeTabActive,
  tabActive,
}: ChampionshipTabsProps) {
  return (
    <nav className="w-full max-w-3xl h-12 mx-auto">
      <ul className="h-full grid grid-cols-4">
        <li
          onClick={() => onChangeTabActive('matches')}
          className={cx(
            styles.tab,
            tabActive === 'matches' && `${styles['tab-active']}`,
          )}
        >
          Partidas
        </li>
        <li
          onClick={() => onChangeTabActive('classification')}
          className={cx(
            styles.tab,
            tabActive === 'classification' && `${styles['tab-active']}`,
          )}
        >
          Classificações
        </li>
        <li
          // onClick={() => onChangeTabActive('statistics')}
          className={cx(
            styles.tab,
            styles['tab-inactive'],
            tabActive === 'statistics' && `${styles['tab-active']}`,
          )}
        >
          Estastísticas
        </li>
        <li
          // onClick={() => onChangeTabActive('players')}
          className={cx(
            styles.tab,
            styles['tab-inactive'],
            tabActive === 'players' && `${styles['tab-active']}`,
          )}
        >
          Jogadores
        </li>
      </ul>
    </nav>
  )
}
