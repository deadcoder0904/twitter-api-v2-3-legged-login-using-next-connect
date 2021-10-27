import { NextApiHandler, NextApiRequest } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { User } from 'next-auth'
// import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import prisma from '../../server/db/prisma'
import { getRequestOrigin } from '../../server/get-request-origin'
import { schema } from '../../server/graphql/schema'
import handler from '../../server/api-route'

export const config = {
  api: {
    bodyParser: false,
  },
}

export interface GraphQLContext {
  // user?: User
  req: NextApiRequest
  prisma: typeof prisma
  origin: string
}

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }): GraphQLContext => {
    return {
      req,
      origin: getRequestOrigin(req),
      prisma,
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
})

const startServer = apolloServer.start()

const apolloHandler: NextApiHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )

  await startServer
  await apolloServer.createHandler({
    path: '/api',
  })(req, res)
}

export default handler().use(apolloHandler)
