import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Providers from 'next-auth/providers'

const options: NextAuthOptions = {
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt(token, user, account) {
      if (account) {
        token[account.provider] = {
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
        }
        console.log(token[account.provider])
      }

      return token
    },
  },
  // debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
