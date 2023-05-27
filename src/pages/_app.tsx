import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

import '../lib/dayjs'

import { ToastContainer } from 'react-toastify'
import { SkeletonTheme } from 'react-loading-skeleton'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Inter, Roboto } from 'next/font/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/query-client'
import { ChampionshipProvider } from '@/context/Championship'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const inter = Inter({
  weight: '900',
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`h-full font-body ${roboto.variable} ${inter.variable}`}>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor="#121214" highlightColor="#202024">
          <ChampionshipProvider>
            <Head>
              <title>Força Jovem Universal</title>
              <meta
                name="description"
                content="Campeonato da força jovem universal"
              />
            </Head>

            <Component {...pageProps} />
          </ChampionshipProvider>
        </SkeletonTheme>

        <ReactQueryDevtools />
      </QueryClientProvider>

      <ToastContainer theme="colored" />
    </div>
  )
}
