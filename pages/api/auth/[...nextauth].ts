import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token[account.provider] = {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        }
      }

      return token
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
