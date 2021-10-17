namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    TWITTER_CONSUMER_KEY: string
    TWITTER_CONSUMER_SECRET: string
    TWITTER_BEARER_TOKEN: string
    COOKIE_SECRET: string
    SESSION_SECRET: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
  }
}
