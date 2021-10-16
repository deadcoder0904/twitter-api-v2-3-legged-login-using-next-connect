import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // console.log({ token })
    return res.status(200).json({
      status: 'Ok',
      data: token,
    })
  } catch (e: unknown) {
    return res.status(400).json({
      status: (e as Error).message,
    })
  }
}
