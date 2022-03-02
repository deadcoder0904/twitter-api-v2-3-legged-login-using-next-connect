import { withIronSessionSsr } from 'iron-session/next'
import { GetServerSidePropsContext } from 'next'

import { Login } from '../components/Login'
import { getUserFromServerSession, withAuthSsr } from '../server/withAuth'
import { SESSION_CONFIG } from '../utils'

const HomePage = () => {
  return (
    <>
      <h1>3-legged Twitter Oauth</h1>
      <Login />
    </>
  )
}

export default HomePage
