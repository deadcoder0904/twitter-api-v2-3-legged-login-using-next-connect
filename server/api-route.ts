import { NextApiResponse } from 'next'
import nc from 'next-connect'
import { ironSession } from 'next-iron-session'
import { error } from 'next/dist/build/output/log'
import { NextIronRequest } from '../types/index'

const COOKIE_SECRET = process.env.COOKIE_SECRET
const SESSION_SECRET = process.env.SESSION_SECRET

const IS_PRODUCTION = process.env.NODE_ENV !== 'development'

/**
 * Create an API route handler with next-connect and all the necessary middlewares
 *
 * @example
 * ```ts
 * export default handler().get((req, res) => { ... })
 * ```
 */
function handler() {
  if (!COOKIE_SECRET || !SESSION_SECRET)
    throw new Error(
      `Please add COOKIE_SECRET & SESSION_SECRET to your .env.local file!`
    )

  return nc<NextIronRequest, NextApiResponse>({
    onError: (err, _, res) => {
      error(err)
      res.status(500).end(err.toString())
    },
  }).use(
    ironSession({
      cookieName: 'mysite-session',
      password: SESSION_SECRET,
      // if your localhost is served on http:// then disable the secure flag
      cookieOptions: {
        secure: IS_PRODUCTION,
      },
    })
  )
}

export default handler
