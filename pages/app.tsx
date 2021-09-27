import Link from 'next/link'
import { useRouter } from 'next/router'

const App = ( ) => {
  const router = useRouter()
  const {username} = router.query

  return (
    <>
      <h1>Welcome {username}, you're logged in</h1>
			<Link href='/api/twitter/logout'>Logout</Link>
    </>
  )
}

export default App
