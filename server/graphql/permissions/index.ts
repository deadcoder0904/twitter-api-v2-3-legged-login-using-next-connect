import { allow, deny, shield } from 'graphql-shield'
import { isAuthenticated } from './rules/isAuthenticated'

export const permissions = shield({
  Query: {
    // '*': allow,
    '*': isAuthenticated,
  },
  Mutation: {
    // '*': deny,
    '*': isAuthenticated,
  },
})
