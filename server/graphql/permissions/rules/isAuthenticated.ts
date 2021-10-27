import { getSession } from 'next-auth/react'
import { rule } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { req }, _info) => {
    const session = await getSession({ req })
    console.log({ session, req })
    return Boolean(session)
  }
)
