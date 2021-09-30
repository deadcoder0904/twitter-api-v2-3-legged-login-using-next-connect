import type { AppProps } from 'next/app'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
