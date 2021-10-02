import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function HomePage() {
  const router = useRouter()

  const twitterLogin = async () => {
    const authWindow = window.open(
      'about:blank',
      '_blank',
      'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600,left=100,top=100'
    )

    if (!authWindow) {
      console.error(
        'Your browser is blocking popups. Allow popups log in with Twitter.'
      )
      return
    }

    signIn()
    // const res = await fetch(`/api/auth/signin/twitter`)
    // const data: { redirect: string } = await res.json()

    // const authURL = data.redirect
    // authWindow.location.href = authURL

    // listen for "window.opener.postMessage" sent from backend via <script>
    window.addEventListener('message', (event) => {
      if (event?.data?.username) {
        const username = event?.data?.username
        router.push(`/app?username=${username}`)
      }
    })
  }

  return (
    <>
      <h1>3-legged Twitter Oauth using next-auth</h1>
      <button onClick={twitterLogin}>Login with Twitter</button>
    </>
  )
}
