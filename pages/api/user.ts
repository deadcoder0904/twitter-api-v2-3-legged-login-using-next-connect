import { NextApiResponse } from 'next'

import { NextIronRequest } from '../../types/index'
import handler from '../../server/api-route'

const user = async (req: NextIronRequest, res: NextApiResponse) => {
  const user = req.session.get('user')

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      ...user,
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
}

export default handler().get(user)
