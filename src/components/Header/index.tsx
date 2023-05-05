import { useRouter } from 'next/router'
import { ArrowLeft } from '@phosphor-icons/react'
import cx from 'clsx'
import { TabActiveLink } from '../TabActiveLink'

interface HeaderProps {
  title: string
  avatar?: string
  backgroundHighlight?: string
}

export function Header({ title, avatar, backgroundHighlight }: HeaderProps) {
  const router = useRouter()

  return (
    <header
      className={cx('flex flex-col  border-b border-b-[#323238]')}
      style={{
        backgroundColor: backgroundHighlight ?? '#202024',
      }}
    >
      <div className="p-6 flex justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={router.back}
            className="w-8 h-8 flex justify-center items-center hover:bg-white/10 rounded-md transition-colors"
          >
            <ArrowLeft size={18} color="#fff" />
          </button>

          <span className="text-white font-semibold">{title}</span>
        </div>

        {avatar && <img src={avatar} alt="" className="w-10 h-10" />}
      </div>

      <nav className="w-full max-w-3xl h-12 mx-auto">
        <ul
          className="h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${1}, 1fr)`,
          }}
        >
          <TabActiveLink
            href={'#'}
            className={cx(
              'h-full flex items-center justify-center text-white text-xs uppercase cursor-pointer transition-all',
              {
                'hover:bg-[#323238]': !backgroundHighlight,
                'hover:bg-white/10': backgroundHighlight,
              },
            )}
          >
            <li>Jogadores</li>
          </TabActiveLink>
        </ul>
      </nav>
    </header>
  )
}
