// This types process.env.TWITTER_BEARER_TOKEN
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      TWITTER_CONSUMER_KEY: string
      TWITTER_CONSUMER_SECRET: string
      TWITTER_BEARER_TOKEN: string
      TWITTER_ACCESS_TOKEN: string
      TWITTER_TOKEN_SECRET: string
    }
  }
}

if (!process.env.TWITTER_CONSUMER_KEY && !process.env.TWITTER_CONSUMER_SECRET)
  throw new Error(
    `Please add TWITTER_CONSUMER_KEY & TWITTER_CONSUMER_KEY to your .env file!`
  )

export const TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: '/api/auth/twitter/callback',
  includeEmail: true,
}
