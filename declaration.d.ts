import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: {
      accessToken: string
      refreshToken: string
    }
  }
}
