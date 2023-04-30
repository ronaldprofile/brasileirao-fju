import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import type { AppProps } from 'next/app'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`h-full ${roboto.className}`}>
      <Component {...pageProps} />

      <ToastContainer theme="colored" />
    </div>
  )
}
