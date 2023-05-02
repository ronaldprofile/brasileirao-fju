import { useRouter } from 'next/router'
import { useHeaderTabs } from '@/hooks/useTabs'
import { ArrowLeft } from '@phosphor-icons/react'
import cx from 'clsx'

interface HeaderProps {
  title: string
  tabsOptions: string[]
  backgroundHighlight?: string
}

export function Header({
  title,
  tabsOptions,
  backgroundHighlight,
}: HeaderProps) {
  const router = useRouter()

  const { tabActive, handleChangeTabActive, totalTabs } =
    useHeaderTabs(tabsOptions)

  function handleBackPage() {
    router.push('/')
  }

  return (
    <header
      className={cx('flex flex-col  border-b border-b-[#323238]')}
      style={{
        backgroundColor: backgroundHighlight ?? '#202024',
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackPage}
            className="w-8 h-8 flex justify-center items-center hover:bg-white/10 rounded-md transition-colors"
          >
            <ArrowLeft size={18} color="#fff" />
          </button>

          <span className="text-white font-semibold">{title}</span>
        </div>
      </div>

      <nav className="w-full max-w-3xl h-12 mx-auto">
        <ul
          className="h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${totalTabs}, 1fr)`,
          }}
        >
          {tabsOptions.map((tab, index) => {
            return (
              <li
                key={index}
                onClick={() => handleChangeTabActive(index)}
                className={cx(
                  'h-full flex items-center justify-center text-white text-xs uppercase cursor-pointer transition-all',
                  tabActive === tab && 'border-b-2 border-b-white',
                  {
                    'hover:bg-[#323238]': !backgroundHighlight,
                    'hover:bg-white/10': backgroundHighlight,
                  },
                )}
              >
                {tab}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
