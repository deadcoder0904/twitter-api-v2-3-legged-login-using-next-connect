import { withIronSession } from 'next-iron-session'

import { SESSION_CONFIG } from '../utils/index'
import { NextIronRequest } from '../types/index'

// export const getUserFromServerSession = ({
//   redirectToLogin,
//   redirectToApp,
// }: {
//   redirectToLogin?: boolean
//   redirectToApp?: boolean
// }) =>
//   withIronSession(async ({ req }: { req: NextIronRequest }) => {
//     try {
//       const token = req.session.get('token')

//       if (!token) throw new Error('Unauthorized user. Please login!')

//       return {
//         props: {},
//       }
//     } catch (err) {
//       if (redirectToLogin) {
//         return {
//           redirect: {
//             permanent: false,
//             destination: '/app',
//           },
//         }
//       } else if (redirectToApp) {
//         return {
//           redirect: {
//             permanent: false,
//             destination: '/',
//           },
//         }
//       }
//       return {
//         props: {},
//       }
//     }
//   }, SESSION_CONFIG)
export const getUserFromServerSession = ({
  redirectToLogin,
  redirectToApp,
}: {
  redirectToLogin?: boolean
  redirectToApp?: boolean
}) =>
  withIronSession(async ({ req }: { req: NextIronRequest }) => {
    const token = req.session.get('token')

    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/app',
        },
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }
  }, SESSION_CONFIG)
