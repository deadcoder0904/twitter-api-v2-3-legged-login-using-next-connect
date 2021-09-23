import { NextApiRequest } from 'next'
import { Session } from 'next-iron-session'

export type AppSession = {
  // twitterTokenSecret?: Record<string, string>
  session: Session
}

export type NextIronRequest = NextApiRequest & AppSession
