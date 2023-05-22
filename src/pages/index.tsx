import Balancer from 'react-wrap-balancer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={`w-full h-full flex justify-center items-center`}>
      <div className="flex flex-col items-center gap-12">
        <h1 className="max-w-[940px] font-alt text-2xl sm:text-5xl text-center tracking-[-.90px] font-black leading-[120%]">
          <Balancer>Bem vindo ao brasileirão força jovem universal</Balancer>
        </h1>

        <Link
          href={'/championship'}
          className="h-12 text-sm sm:text-base px-4 flex items-center justify-center bg-[#00875F] rounded-md font-medium"
        >
          Ver campeonato
        </Link>
      </div>
    </div>
  )
}
