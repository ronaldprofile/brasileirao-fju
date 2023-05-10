import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import { SkeletonTheme } from 'react-loading-skeleton'
import type { AppProps } from 'next/app'

import { Roboto } from 'next/font/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/query-client'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`h-full ${roboto.className}`}>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor="#121214" highlightColor="#202024">
          <Component {...pageProps} />
        </SkeletonTheme>

        <ReactQueryDevtools />
      </QueryClientProvider>

      <ToastContainer theme="colored" />
    </div>
  )
}
