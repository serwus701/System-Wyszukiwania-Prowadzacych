import React, { useEffect } from "react"
import useGoogleAuthToken from "../../hooks/useGoogleAuthToken"
import useGoogleAuthLink from "../../hooks/useGoogleAuthLink"
import useProfile from "../../hooks/useProfile"
// import { logOut } from "../../api"

function Login() {
  const { data: profile, refetch: fetchProfile } = useProfile()
  const { data: googleAuth, refetch: fetchGoogleAuth } = useGoogleAuthLink()
  const { mutate, isSuccess } = useGoogleAuthToken()

  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorizationUrl)
    }
  }, [googleAuth])

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)

    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (code && state) {
      mutate({ code, state })
    }
  }, [mutate])

  useEffect(() => {
    if (isSuccess) {
      fetchProfile()  
    }
  }, [isSuccess, fetchProfile])
  const handleGoogleLogin = () => {
    fetchGoogleAuth()
  }

  return (
    <div className="App">
      {profile ? (
        <h1>Pomyślnie zalogowano!</h1>
      ) : (
        handleGoogleLogin()
      )}
    </div>
  )
}
export default Login