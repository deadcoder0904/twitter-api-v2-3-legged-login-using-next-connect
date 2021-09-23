import { NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'

import { TWITTER_CONFIG } from './config'
import { NextIronRequest } from '../../../types/index'

export const getVerifierToken = async (
  req: NextIronRequest,
  res: NextApiResponse
) => {
  // check query params and session data
  const { oauth_token, oauth_verifier } = req.query

  if (typeof oauth_token !== 'string' || typeof oauth_verifier !== 'string') {
    res.status(401).send('Oops, it looks like you refused to log in..')
    return
  }

  if (!req.session.get(oauth_token))
    throw new Error("Can't find `twitterTokenSecret` in `req.session`")

  const oauthTokenSecret = req.session.get(oauth_token)

  if (typeof oauthTokenSecret !== 'string') {
    res
      .status(401)
      .send('Oops, it looks like your session has expired.. Try again!')
    return
  }

  // fetch the token / secret / account infos (from the temporary one)
  const loginResult = await new TwitterApi({
    appKey: TWITTER_CONFIG.consumerKey,
    appSecret: TWITTER_CONFIG.consumerSecret,
    accessToken: oauth_token,
    accessSecret: oauthTokenSecret,
  }).login(oauth_verifier)

  console.log({ loginResult })

  res.redirect('/')
}
