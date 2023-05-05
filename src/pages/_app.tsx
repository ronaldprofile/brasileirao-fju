import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import { SkeletonTheme } from 'react-loading-skeleton'
import type { AppProps } from 'next/app'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`h-full ${roboto.className}`}>
      <SkeletonTheme baseColor="#121214" highlightColor="#202024">
        <Component {...pageProps} />
      </SkeletonTheme>

      <ToastContainer theme="colored" />
    </div>
  )
}
