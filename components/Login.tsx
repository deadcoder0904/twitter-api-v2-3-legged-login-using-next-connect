const twitterLogin = async () => {
  const authWindow = window.open(
    "about:blank",
    "_blank",
    "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600,left=100,top=100"
  );

  if (!authWindow) {
    console.error("Your browser is blocking popups. Allow popups log in with Twitter.");
    return;
  }

  const res = await fetch(`/api/twitter/generate-auth-link`);
  const data: {url: string} = await res.json()
  
	const authURL = data.url;
  authWindow.location.href = authURL;

  // listen for "window.opener.postMessage" sent from backend via <script>
  window.addEventListener("message", (event) => {
    console.log({event})
    if (event?.data?.success) {
      const token = event?.data?.token;
    }
  });
}

export const Login = () => <>
  <button onClick={twitterLogin}>Login with Twitter</button>
</>