import { NextApiRequest } from 'next'
import { Session } from 'next-iron-session'

export type AppSession = {
  session: Session
}

export type NextIronRequest = NextApiRequest & AppSession
