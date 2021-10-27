import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'

const secretHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    res.end(
      `Welcome to the mega secret VIP club, *${
        session.user.email ?? session.username
      }*`
    )
  } else {
    res.statusCode = 403
    res.end(`Hold on, you are not allowed in here!`)
  }
}

export default secretHandler
