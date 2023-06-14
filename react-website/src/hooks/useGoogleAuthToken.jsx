import { useMutation } from "@tanstack/react-query"
import { getGoogleAuthToken, TOKEN_KEY } from "../api"

const useGoogleAuthToken = () =>
  useMutation({
    mutationKey: ["google_auth_token"],
    mutationFn: credential => getGoogleAuthToken(credential),
    onSuccess: data => {
      const { access } = data
      localStorage.setItem(TOKEN_KEY, access)
    }
  })

export default useGoogleAuthToken