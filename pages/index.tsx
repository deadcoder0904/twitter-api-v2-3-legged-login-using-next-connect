import React from 'react'
import { GetServerSideProps } from 'next'
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
interface IHomePage {
  providers: Record<string, ClientSafeProvider>
}

interface User {
  name: string
  screen_name: string
}

interface Twit {
  id: string
  text: string
  user: User
}

const HomePage = ({ providers }: IHomePage) => {
  const [statuses, setStatuses] = React.useState([])
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
        <h1>Welcome to dashboard, {session.data?.user?.name}</h1>
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
      {Object.values(providers).map((provider) => (
        <button key={provider.name} onClick={() => signIn(provider.id)}>
          Login with {provider.name}
        </button>
      ))}
      {/* <div>
        <form onSubmit={handleOnSearchSubmit}>
          <h2>Search</h2>
          <input type="search" name="query" />
          <button>Search</button>
        </form>
        {statuses && (
          <ul>
            {statuses.map(({ id, text, user }) => {
              return (
                <li key={id}>
                  <p>{text}</p>
                  <p>
                    By {user.name} ({user.screen_name})
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </div> */}
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
