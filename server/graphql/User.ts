// import { User } from 'nexus-prisma'
// import { extendType, nonNull, objectType, stringArg } from 'nexus'

// import prisma from '../../server/db/prisma'

// const UserType = objectType({
//   name: User.$name,
//   description: User.$description,
//   definition(t) {
//     t.field(User.id)
//     t.field(User.name)
//     t.field(User.username)
//     t.field(User.email)
//   },
// })

// const queries = extendType({
//   type: 'Query',
//   definition: (t) => {
//     t.field('currentUser', {
//       type: 'User',
//       resolve: (_, __, ctx) => {
//         if (!ctx.user?.id) return null

//         return prisma.user.findUnique({
//           where: {
//             id: ctx.user.id,
//           },
//         })
//       },
//     })
//   },
// })

// const mutations = extendType({
//   type: 'Mutation',
//   definition: (t) => {
//     t.nullable.field('createUser', {
//       type: 'User',
//       args: {
//         userId: nonNull(stringArg()),
//         username: nonNull(stringArg()),
//       },
//       resolve: async (_, { userId, username }, ctx) => {
//         if (!ctx.user?.id || userId !== ctx.user.id) return null

//         return await prisma.user.create({
//           data: { username },
//         })
//       },
//     })
//     t.nullable.field('updateUser', {
//       type: 'User',
//       args: {
//         userId: nonNull(stringArg()),
//         name: stringArg(),
//       },
//       resolve: async (_, { userId, name }, ctx) => {
//         if (!ctx.user?.id || userId !== ctx.user.id) return null

//         return await prisma.user.update({
//           where: { id: userId },
//           data: { name },
//         })
//       },
//     })
//   },
// })

// export default [UserType, mutations, queries]

import { objectType, extendType, stringArg, nonNull } from 'nexus'

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('username')
    t.string('email')
  },
})

const queries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('currentUser', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, { id }, ctx) => {
        if (!id) return null

        return ctx.prisma.user.findUnique({
          where: {
            id,
          },
        })
      },
    })
  },
})

export const mutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createUser', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
      },
      resolve: async (_, { username }, ctx) => {
        return await ctx.prisma.user.create({
          data: { username },
        })
      },
    })
  },
})

export default [User, queries, mutations]
