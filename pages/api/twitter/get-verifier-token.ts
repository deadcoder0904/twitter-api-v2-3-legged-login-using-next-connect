import { SERVER_URL } from './../../../utils/index'
import { NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'

import { twitterClient } from './client'
import { TWITTER_CONFIG } from '../../../lib/config'
import { NextIronRequest } from '../../../types/index'
import handler from '../../../server/api-route'

const getVerifierToken = async (req: NextIronRequest, res: NextApiResponse) => {
  const state = req.query.state as string
  const code = req.query.code as string
  const { state: storedState, codeVerifier } = req.session.twitter

  if (storedState !== state) {
    return res
      .status(400)
      .send(
        'OAuth token is not known or invalid. Your request may have expired. Please renew the auth process.'
      )
  }
  const {
    client: loggedClient,
    accessToken,
    refreshToken,
    expiresIn,
  } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: TWITTER_CONFIG.callbackURL,
  })

  const {
    data: { id: userId, name, username, profile_image_url },
  } = await loggedClient.v2.me()

  console.log({ userId, name, username, profile_image_url })

  res.send(`
<html>
  <body>
    <h1>You successfully logged in! closing this window...</h1>
  </body>
  <script>
    window.opener && window.opener.postMessage({ username: '${username}' }, '${SERVER_URL}');
    close();
  </script>
</html>
  `)
}

export default handler().get(getVerifierToken)
