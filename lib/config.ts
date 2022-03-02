import { SERVER_URL } from '../utils'

if (!process.env.TWITTER_CONSUMER_KEY && !process.env.TWITTER_CONSUMER_SECRET)
  throw new Error(
    `Please add TWITTER_CONSUMER_KEY & TWITTER_CONSUMER_KEY to your .env file!`
  )

export const TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: `${SERVER_URL}/api/twitter/get-verifier-token`,
  includeEmail: true,
}
