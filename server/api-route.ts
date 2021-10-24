import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { error } from 'next/dist/build/output/log'

interface Request extends NextApiRequest {
  // Passport adds these to the request object
  logout: () => void
}

/**
 * Create an API route handler with next-connect and all the necessary middlewares
 *
 * @example
 * ```ts
 * export default handler().get((req, res) => { ... })
 * ```
 */
function handler() {
  return nc<Request, NextApiResponse>({
    onError: (err, _, res) => {
      error(err)
      res.status(500).end(err.toString())
    },
  })
}

export default handler
