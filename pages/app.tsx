import { useRouter } from 'next/router'

import { Search } from '../components/Search'
import { withSessionSsr } from '../lib/withSession'

const App = () => {
  const router = useRouter()
  const { username } = router.query

  const logout = async () => {
    await fetch('/api/twitter/logout')
    router.push('/')
  }

  return (
    <>
      <h1>Welcome {username}, you're logged in</h1>
      <Search />
      <button onClick={logout}>Logout</button>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = context.req.session.user

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      user,
    },
  }
})

export default App
