import { NextApiResponse } from 'next'

import { NextIronRequest } from '../../../types/index'
import handler from '../../../server/api-route'

const logout = async (
  req: NextIronRequest,
  res: NextApiResponse
) => {
	req.session.destroy()
  res.status(200).send({})
}

export default handler().get(logout)