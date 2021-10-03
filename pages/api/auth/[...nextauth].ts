import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
