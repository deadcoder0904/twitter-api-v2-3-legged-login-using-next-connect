import { NextApiHandler } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { User } from 'next-auth'
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
  user?: User
  prisma: typeof prisma
  origin: string
}

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }): GraphQLContext => ({
    user: req.user,
    origin: getRequestOrigin(req),
    prisma,
  }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
})

const startServer = apolloServer.start()

const apolloHandler: NextApiHandler = async (req, res) => {
  await startServer
  await apolloServer.createHandler({
    path: '/api',
  })(req, res)
}

export default handler().use(apolloHandler)
