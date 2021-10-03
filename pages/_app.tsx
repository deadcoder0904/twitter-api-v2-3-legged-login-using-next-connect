import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

const CustomApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default CustomApp
