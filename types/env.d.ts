namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    TWITTER_CONSUMER_KEY: string
    TWITTER_CONSUMER_SECRET: string
    TWITTER_CLIENT_ID: string
    TWITTER_CLIENT_SECRET: string
    TWITTER_BEARER_TOKEN: string
    COOKIE_SECRET: string
    SESSION_SECRET: string
    IRON_COOKIE_NAME: string
    IRON_PASSWORD: string
    NEXT_PUBLIC_BASE_URL: string
  }
}
