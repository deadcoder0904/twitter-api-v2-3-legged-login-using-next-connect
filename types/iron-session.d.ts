import { IronSessionData } from 'iron-session'
import { UserV1 } from 'twitter-api-v2'

declare module 'iron-session' {
  interface IronSessionData {
    user: Pick<UserV1, 'id' | 'name' | 'email'> & {
      username: UserV1['screen_name']
      profile_image: UserV1['profile_image_url_https']
      isLoggedIn: boolean
    }
    twitter: {
      state: string
      codeVerifier: string
    }
  }
}
