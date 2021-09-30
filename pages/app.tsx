import { useRouter } from 'next/router'

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
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default App
