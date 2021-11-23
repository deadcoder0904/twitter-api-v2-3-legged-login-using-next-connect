import { Login } from '../components/Login'
import { getUserFromServerSession } from '../server/withAuth'

const HomePage = () => {
  return (
    <>
      <h1>3-legged Twitter Oauth</h1>
      <Login />
    </>
  )
}

export const getServerSideProps = getUserFromServerSession({
  redirectToApp: true,
})

export default HomePage
