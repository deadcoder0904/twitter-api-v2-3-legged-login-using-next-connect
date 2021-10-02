import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

import { IS_DEVELOPMENT } from '../../../utils'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  // pages: {
  //   signIn: '/',
  //   signOut: '/auth/logout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  // },
  debug: IS_DEVELOPMENT,
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
