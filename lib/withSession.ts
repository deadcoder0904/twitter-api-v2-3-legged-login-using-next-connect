import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

import { SESSION_CONFIG } from '../utils/index'

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, SESSION_CONFIG)
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, SESSION_CONFIG)
}
