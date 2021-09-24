import { NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'

import { TWITTER_CONFIG } from './config'
import { IRON_SESSION_ID_KEY, IS_PRODUCTION } from '../../../utils/index'
import { AppSession, NextIronRequest } from '../../../types/index'

export const CLIENT_URL = IS_PRODUCTION
  ? 'https://tweetfairy.com/'
  : 'http://localhost:3000/'
export const SERVER_URL = IS_PRODUCTION
  ? 'https://tweetfairy.com/api/'
  : 'http://localhost:3001/'

export const generateAuthLink = async (
  req: NextIronRequest,
  res: NextApiResponse
) => {
  // Generate an authentication URL
  const { url, oauth_token, oauth_token_secret } = await new TwitterApi({
    appKey: TWITTER_CONFIG.consumerKey,
    appSecret: TWITTER_CONFIG.consumerSecret,
  }).generateAuthLink(SERVER_URL + '/auth/get-verifier-token')

  const reqWithSession = req as unknown as AppSession

  // store the relevant information in the session
  // session.twitterTokenSecret = req.session.twitterTokenSecret || {}
  // session.twitterTokenSecret[oauth_token] = oauth_token_secret
  reqWithSession.session.set(IRON_SESSION_ID_KEY, {
    [oauth_token]: oauth_token_secret
  })
  await reqWithSession.session.save()

  // redirect to the authentication URL
  res.redirect(url)
}
