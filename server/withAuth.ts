import { withIronSession } from 'next-iron-session'

import { SESSION_CONFIG } from '../utils/index'
import { NextIronRequest } from '../types/index'

export const getUserFromServerSession = ({
  redirectToLogin,
}: {
  redirectToLogin?: boolean
}) =>
  withIronSession(async ({ req }: { req: NextIronRequest }) => {
    try {
      const user = req.session.get('user')
      console.log({ user })

      if (!user) throw new Error('Unauthorized user. Please login!')

      return {
        props: {
          user,
        },
      }
    } catch (err) {
      if (redirectToLogin) {
        return {
          redirect: {
            permanent: false,
            destination: '/app',
          },
        }
      } else {
        return {
          props: {},
        }
      }
    }
  }, SESSION_CONFIG)
