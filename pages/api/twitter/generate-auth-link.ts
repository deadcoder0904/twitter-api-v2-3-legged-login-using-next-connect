import { NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'

import { TWITTER_CONFIG } from '../../../lib/config'
import { SERVER_URL } from '../../../utils/index'
import { NextIronRequest } from '../../../types/index'
import handler from '../../../server/api-route'

const generateAuthLink = async (req: NextIronRequest, res: NextApiResponse) => {
  // Generate an authentication URL
  const { url, oauth_token, oauth_token_secret } = await new TwitterApi({
    appKey: TWITTER_CONFIG.consumerKey,
    appSecret: TWITTER_CONFIG.consumerSecret,
  }).generateAuthLink(`${SERVER_URL}/api/twitter/get-verifier-token`)

  req.session.set(oauth_token, oauth_token_secret)
  await req.session.save()

  // redirect to the authentication URL
  res.send({ redirect: url })
}

export default handler().get(generateAuthLink)
