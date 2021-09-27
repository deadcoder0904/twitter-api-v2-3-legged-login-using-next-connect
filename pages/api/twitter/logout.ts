import { NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'

import { TWITTER_CONFIG } from '../../../lib/config'
import { NextIronRequest } from '../../../types/index'
import handler from '../../../server/api-route'

const logout = async (
  req: NextIronRequest,
  res: NextApiResponse
) => {
  // // check query params and session data
  // const { oauth_token, oauth_verifier } = req.query
	req.session.destroy()

  res.redirect('/')
}

export default handler().get(logout)