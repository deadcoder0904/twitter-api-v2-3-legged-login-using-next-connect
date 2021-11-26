import { NextApiRequest } from 'next'
import { IronSession } from 'iron-session'

export type AppSession = {
  session: IronSession
}

export type NextIronRequest = NextApiRequest & AppSession
