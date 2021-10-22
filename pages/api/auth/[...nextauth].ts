import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
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
  callbacks: {
    async signIn({ user, profile }) {
      user.username = profile.screen_name
      return true
    },
    async jwt({ token, account }) {
      if (account) {
        token[account.provider] = {
          accessToken: account.oauth_token,
          refreshToken: account.oauth_token_secret,
        }
      }

      return token
    },
  },
  // debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
