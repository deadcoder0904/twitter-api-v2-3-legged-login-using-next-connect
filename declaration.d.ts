declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: {
      accessToken: string
      refreshToken: string
    }
  }
}
