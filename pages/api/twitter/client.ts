import TwitterApi from 'twitter-api-v2'

import { TWITTER_CONFIG } from '../../../lib/config'

export const twitterClient = new TwitterApi({
  clientId: TWITTER_CONFIG.clientId,
  // clientSecret: TWITTER_CONFIG.clientSecret,
})
