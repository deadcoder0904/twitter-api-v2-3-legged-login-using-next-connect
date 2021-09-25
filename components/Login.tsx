import Link from 'next/link'
import { CLIENT_URL } from "../utils";

const twitterLogin = async () => {
  // const authWindow = window.open(
  //   "about:blank",
  //   "_blank",
  //   "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600,left=100,top=100"
  // );

  // if (!authWindow) {
  //   console.error("Your browser is blocking popups. Allow popups log in with Twitter.");
  //   return;
  // }

  const res = await fetch(`${CLIENT_URL}api/twitter/generate-auth-link`);
	console.log({res})
  
	// const authURL = res.data.redirect;
  // authWindow.location.href = authURL;
}

export const Login = () => <>
  <Link href={`${CLIENT_URL}api/twitter/generate-auth-link`}>Login with Twitter</Link>
</>