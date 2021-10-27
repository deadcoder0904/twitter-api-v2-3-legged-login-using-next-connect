import { makeSchema } from 'nexus'
import path from 'path'
import { applyMiddleware } from 'graphql-middleware'

import { permissions } from './permissions/index'
import User from './User'

const shouldGenerateArtifacts =
  process.env.NODE_ENV === 'development' || !!process.env.GENERATE

const baseSchema = makeSchema({
  types: [User],
  plugins: [],
  // Type the GraphQL context when used in Nexus resolvers
  contextType: {
    module: path.join(process.cwd(), 'pages/api/index.ts'),
    export: 'GraphQLContext',
  },
  // Generate the files
  shouldGenerateArtifacts,
  outputs: {
    typegen: path.join(
      process.cwd(),
      'server/graphql/nexus-types.generated.ts'
    ),
    schema: path.join(process.cwd(), 'server/graphql/schema.graphql'),
  },
})

export const schema = applyMiddleware(baseSchema, permissions)
