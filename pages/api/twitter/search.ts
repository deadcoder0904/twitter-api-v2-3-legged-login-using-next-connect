import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { TwitterApi } from 'twitter-api-v2'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body)
  const { query } = body

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token)
    return res.status(401).json({
      status: 'token is null',
    })

  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token.twitter.oauth_token,
    accessSecret: token.twitter.oauth_token_secret,
  })

  try {
    const data = await userClient.search(query)

    return res.status(200).json({
      status: 'Ok',
      data: data.tweets,
    })
  } catch (e: unknown) {
    return res.status(400).json({
      status: (e as Error).message,
    })
  }
}
