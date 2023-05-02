import { useRouter } from 'next/router'
import { Header } from '@/components/Header'

const tabsOptions = ['Partidas', 'Classificação', 'Jogadores']

export default function Teams() {
  const { query } = useRouter()

  return (
    <div className="w-full h-full">
      <Header
        title="Manchester United"
        tabsOptions={tabsOptions}
        // backgroundHighlight="#DA291C"
        backgroundHighlight="#223344"
      />

      <strong className="text-white">Hi {query.id}</strong>
    </div>
  )
}
