import { DatePicker } from '@/components/DatePicker'
import { ArrowLeft, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Match() {
  const router = useRouter()

  const confrontationDate = null

  return (
    <div className="w-full h-full">
      <header className="w-full bg-[#202024] border-b border-b-[#323238]">
        <div className="py-5 px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={router.back}
              className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center hover:bg-[#323238] rounded-md"
            >
              <ArrowLeft size={24} color="#fff" />
            </button>

            <div className="flex items-center gap-1">
              <span className="text-white">Manchester City</span>
              <X size={14} color="#fff" />
              <span className="text-white">Manchester United</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mt-6">
        <div className="w-full bg-[#202024] max-w-3xl mx-auto pt-6 pb-6 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#a9a9b2]">Premier League</span>
              <div className="w-[1.5px] h-[1.5px] bg-[#a9a9b2] rounded-full"></div>
              <span className="text-sm text-[#a9a9b2]">Hoje</span>
            </div>

            <span className="text-sm text-[#a9a9b2]">Encerrado</span>
          </div>

          <div className="w-full mt-4 max-w-[600px] mx-auto flex gap-16 justify-center items-center">
            <div className="flex" id="home_team">
              <div className="flex flex-col items-center">
                <img
                  className="w-12 h-12"
                  src="https://storage.googleapis.com/hml-fju-api-nodejs.appspot.com/teams/1683164993359.png"
                  alt=""
                />

                <Link href={'#'} className="hover:underline">
                  <span className="text-sm text-[#a9a9b2]">City</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4" id="score">
              {/* <div className="flex items-center">
                <span className="text-4xl">3</span>
              </div> */}

              <X size={20} color="#a9a9b2" className="mx-4" />

              {/* <div className="flex items-center">
                <span className="text-4xl">3</span>
              </div> */}
            </div>

            <div className="flex" id="away_team">
              <div className="flex flex-col items-center">
                <img
                  className="w-12 h-12"
                  src="https://storage.googleapis.com/hml-fju-api-nodejs.appspot.com/teams/1682975893199.png"
                  alt=""
                />

                <Link href={'#'} className="hover:underline">
                  <span className="text-sm text-[#a9a9b2]">United</span>
                </Link>
              </div>
            </div>
          </div>

          {!confrontationDate && (
            <div className="mt-10">
              <DatePicker />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
