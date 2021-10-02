import { GetServerSideProps } from 'next'
import { getCsrfToken } from 'next-auth/react'

interface ILogin {
  csrfToken?: string
}

const Login = ({ csrfToken }: ILogin) => {
  return (
    <form method="post" action="/api/auth/signin/twitter">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <button type="submit">Sign in to Twitter</button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}

export default Login
