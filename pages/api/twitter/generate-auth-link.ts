import { NextApiResponse } from 'next'

import { twitterClient } from './client'
import { TWITTER_CONFIG } from '../../../lib/config'
import { NextIronRequest } from '../../../types/index'
import handler from '../../../server/api-route'

const generateAuthLink = async (req: NextIronRequest, res: NextApiResponse) => {
  // Generate an authentication URL
  const { state, codeVerifier, url } = twitterClient.generateOAuth2AuthLink(
    TWITTER_CONFIG.callbackURL,
    {
      scope: ['tweet.read', 'offline.access'],
    }
  )

  req.session.twitter = {
    state,
    codeVerifier,
  }

  await req.session.save()

  // redirect to the authentication URL
  res.send({ redirect: url })
}

export default handler().get(generateAuthLink)
