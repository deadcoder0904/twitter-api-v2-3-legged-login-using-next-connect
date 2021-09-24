import { NextApiResponse } from 'next'
import { withIronSession as wIS} from 'next-iron-session'

import { NextIronRequest } from './../types/index'
import {  IS_PRODUCTION } from '../utils/index'

const SESSION_SECRET = process.env.SESSION_SECRET

if (!SESSION_SECRET)
throw new Error(
	`Please add COOKIE_SECRET & SESSION_SECRET to your .env.local file!`
)

export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse,
) => void | Promise<void>;

export const withIronSession = (handler: NextIronHandler) => wIS(handler,{
	cookieName: 'mysite-session',
	password: SESSION_SECRET,
	// if your localhost is served on http:// then disable the secure flag
	cookieOptions: {
		secure: IS_PRODUCTION,
	},
})