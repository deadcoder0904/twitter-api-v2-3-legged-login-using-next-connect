import { GetServerSidePropsContext } from 'next'
import { withIronSessionSsr } from 'iron-session/next'

import { SESSION_CONFIG } from '../utils/index'
import { NextIronRequest } from '../types/index'
import { withSessionSsr } from '../lib/withSession'

// export const getUserFromServerSession = ({
//   redirectToLogin,
//   redirectToApp,
// }: {
//   redirectToLogin?: boolean
//   redirectToApp?: boolean
// }) =>
//   withIronSessionSsr(async ({ req }) => {
//     try {
//       const token = req.session.twitter.state

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
let i = 0
export const getUserFromServerSession = () =>
  withIronSessionSsr(async ({ req }) => {
    console.log(req.session, i++)
    const user = req.session.user

    if (!user) {
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

export const withAuth =
  (gssp: any) => async (context: GetServerSidePropsContext) => {
    const { req } = context
    const user = req.session.user

    if (!user) {
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      }
    }

    return await gssp(context)
  }

export const withAuthSsr = (handler: any) => withSessionSsr(withAuth(handler))
