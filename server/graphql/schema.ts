import { makeSchema } from 'nexus'
import path from 'path'

import User from './User'

const shouldGenerateArtifacts =
  process.env.NODE_ENV === 'development' || !!process.env.GENERATE

export const schema = makeSchema({
  types: [User],
  plugins: [],
  // Type the GraphQL context when used in Nexus resolvers
  contextType: {
    module: path.join(process.cwd(), 'src/pages/api/index.ts'),
    export: 'GraphQLContext',
  },
  // Generate the files
  shouldGenerateArtifacts,
  outputs: {
    typegen: path.join(
      process.cwd(),
      'src/server/graphql/nexus-types.generated.ts'
    ),
    schema: path.join(process.cwd(), 'src/server/graphql/schema.graphql'),
  },
})
