import Link from 'next/link'

const App = () => {
  return (
    <>
      <h1>Welcome, you're logged in</h1>
			<Link href='/api/twitter/logout'>Logout</Link>
    </>
  )
}

export default App
