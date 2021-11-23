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
      const token = req.session.get('token')

      if (!token) throw new Error('Unauthorized user. Please login!')

      return {
        props: {},
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
