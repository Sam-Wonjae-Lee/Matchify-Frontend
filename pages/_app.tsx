import '../styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default App
