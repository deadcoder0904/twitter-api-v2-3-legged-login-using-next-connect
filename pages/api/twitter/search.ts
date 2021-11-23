import { NextApiResponse } from 'next'
import { TwitterApi } from 'twitter-api-v2'

import handler from '../../../server/api-route'
import { NextIronRequest } from '../../../types/index'

const search = async (req: NextIronRequest, res: NextApiResponse) => {
  const { query } = req.body
  const token = req.session.get('token')

  if (!token)
    return res.status(401).json({
      status: 'token is null',
    })

  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token.accessToken,
    accessSecret: token.accessSecret,
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

export default handler().post(search)
