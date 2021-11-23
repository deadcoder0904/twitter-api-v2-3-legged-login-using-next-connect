import { useRouter } from 'next/router'

import { Search } from '../components/Search'
import { getUserFromServerSession } from '../server/withAuth'

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

export const getServerSideProps = getUserFromServerSession({
  redirectToLogin: true,
})

export default App
