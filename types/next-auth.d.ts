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
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    /** The user's username. */
    username: string
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {
    oauth_token: string
    oauth_token_secret: string
  }
  /** The OAuth profile returned from your provider */
  interface Profile {
    screen_name: string
  }
}
