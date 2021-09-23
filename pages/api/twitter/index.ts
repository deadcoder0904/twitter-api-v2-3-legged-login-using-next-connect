import handler from '../../../server/api-route'
import { TWITTER_CONFIG } from './config'
import { generateAuthLink } from './generate-auth-link'
import { getVerifierToken } from './get-verifier-token'

if (process.browser)
  throw new Error(
    'DO NOT USE twitter/index.ts IN THE BROWSER AS YOU WILL EXPOSE FULL CONTROL OVER YOUR TWITTER ACCOUNT!'
  )

export default handler()
  .get('/twitter/generate-auth-link', generateAuthLink)
  .get('/twitter/get-verifier-token', getVerifierToken)

export { TWITTER_CONFIG }
