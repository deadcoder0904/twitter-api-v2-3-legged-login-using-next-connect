import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile) {
        token.username = profile?.screen_name
      }
      if (account) {
        token[account.provider] = {
          oauth_token: account.oauth_token,
          oauth_token_secret: account.oauth_token_secret,
        }
      }

      return token
    },
    async session({ session, token }) {
      session.username = token.username
      return session
    },
  },
  // debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

export default (req: NextApiRequest & { user: User }, res: NextApiResponse) =>
  NextAuth(req, res, options)
