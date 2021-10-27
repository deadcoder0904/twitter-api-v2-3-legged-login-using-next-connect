import { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: {
      /**
       * Twitter's Accesss Token or Oauth Token
       */
      oauth_token: string
      /**
       * Twitter's Refresh Token or Oauth Token Secret
       */
      oauth_token_secret: string
    }

    /** The user's username. */
    username: string | undefined
  }
}

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}
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
    /**
     * Twitter's Accesss Token or Oauth Token
     */
    oauth_token: string
    /**
     * Twitter's Refresh Token or Oauth Token Secret
     */
    oauth_token_secret: string
  }
  /** The OAuth profile returned from your provider */
  interface Profile {
    screen_name: string
  }
}
