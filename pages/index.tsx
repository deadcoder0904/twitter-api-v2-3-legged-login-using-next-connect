import React from 'react'
import { GetServerSideProps } from 'next'
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from 'next-auth/react'
import { useRouter } from 'next/router'
interface IHomePage {
  providers: Record<string, ClientSafeProvider> | null
}

interface Twit {
  id: string
  text: string
}

const HomePage = ({ providers }: IHomePage) => {
  const [statuses, setStatuses] = React.useState<Twit[]>([])
  const session = useSession()
  const router = useRouter()

  async function handleOnSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const query = formData.get('query')

    const results = await fetch('/api/twitter/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
      }),
    }).then((res) => res.json())

    setStatuses(results.data)
  }

  if (session && session.data) {
    return (
      <>
        <h1>Welcome to dashboard, {session.data.user?.username}</h1>
        <div>
          <form onSubmit={handleOnSearchSubmit}>
            <h2>Search</h2>
            <input type="search" name="query" />
            <button>Search</button>
          </form>
          {statuses && (
            <ul>
              {statuses.map(({ id, text }) => (
                <li key={id}>{text}</li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={async () => {
            // makes sure the page doesn't refresh after logout. see https://next-auth.js.org/getting-started/client#using-the-redirect-false-option-1
            const data = await signOut({ redirect: false })
            router.push(data.url)
          }}
        >
          Logout
        </button>
      </>
    )
  }

  return (
    <>
      <h1>3-legged Twitter Oauth using next-auth</h1>
      {Object.values(providers ?? {}).map((provider) => (
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
