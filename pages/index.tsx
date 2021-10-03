import { GetServerSideProps } from 'next'
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from 'next-auth/react'

interface IHomePage {
  providers: Record<string, ClientSafeProvider>
}

const HomePage = ({ providers }: IHomePage) => {
  const session = useSession()

  if (session && session.data)
    return (
      <>
        <h1>Welcome to dashboard, {session.data?.user?.name}</h1>
        <button onClick={() => signOut()}>Logout</button>
      </>
    )

  return (
    <>
      <h1>3-legged Twitter Oauth using next-auth</h1>
      {Object.values(providers).map((provider) => (
        <button key={provider.name} onClick={() => signIn(provider.id)}>
          Login with {provider.name}
        </button>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default HomePage
