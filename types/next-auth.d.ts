import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: {
      accessToken: string | undefined
      refreshToken: string | undefined
    }
  }
}

declare module 'next-auth' {
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {
    oauth_token: string
    oauth_token_secret: string
  }
}
Terms
