export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_TEST = process.env.NODE_ENV === 'test'

export const CLIENT_URL = IS_PRODUCTION
  ? 'https://mysite.com'
  : 'http://localhost:3000'
export const SERVER_URL = IS_PRODUCTION
  ? 'https://mysite.com/api'
  : 'http://localhost:3000'

export const SESSION_TTL = 182 * 24 * 3600

const SESSION_SECRET = process.env.SESSION_SECRET
if (!SESSION_SECRET)
  throw new Error(`Please add SESSION_SECRET to your .env.local file!`)

export const SESSION_CONFIG = {
  cookieName: 'mysite-iron-session',
  password: SESSION_SECRET,
}
