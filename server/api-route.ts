import { NextApiResponse } from 'next'
import nc from 'next-connect'
import { ironSession } from 'next-iron-session'
import { error } from 'next/dist/build/output/log'
import { NextIronRequest } from '../types/index'
import { SESSION_CONFIG } from '../utils/index'

/**
 * Create an API route handler with next-connect and all the necessary middlewares
 *
 * @example
 * ```ts
 * export default handler().get((req, res) => { ... })
 * ```
 */
function handler() {
  return nc<NextIronRequest, NextApiResponse>({
    onError: (err, _, res) => {
      error(err)
      res.status(500).end(err.toString())
    },
  }).use(ironSession(SESSION_CONFIG))
}

export default handler
