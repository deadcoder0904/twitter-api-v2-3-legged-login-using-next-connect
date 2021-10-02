import { SessionProvider } from 'next-auth/react'

import { AppProps } from 'next/app'

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
