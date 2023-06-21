import axios from "axios"
import { camelizeKeys } from "humps"

export const TOKEN_KEY = "token"
const BASE_URL = "http://127.0.0.1:8000"

export const client = axios.create({
  baseURL: BASE_URL
})

client.interceptors.response.use(response => {
  if (response.data) {
    response.data = camelizeKeys(response.data)
  }
  return response
})

client.interceptors.request.use(config => {
  localStorage.setItem(TOKEN_KEY, '11a9eec95fad750da252b045ebd0d5109093d130')
  
  const token = localStorage.getItem(TOKEN_KEY)

  if (token) {
    config.headers["Authorization"] = `Token ${token}`
  }
  return config
})

export const getGoogleAuthLink = async () => {
  const response = await client.get("/auth/o/google-oauth2/", {
    params: {
      redirect_uri: "http://127.0.0.1:3000"
    },
    withCredentials: true
  })
  return response.data
}

export const getGoogleAuthToken = async credential => {
  const response = await client.post("/auth/o/google-oauth2/", credential, {
    headers: { "content-type": "application/x-www-form-urlencoded" },
    withCredentials: true
  })
  return response.data
}

export const getProfile = async () => {
  const response = await client.get("/auth/users/me/")
  localStorage.setItem("PROFILE", JSON.stringify(response.data));
  return response.data
}

// export const logOut = async () => {
//   const response = await client.get("/auth/users/me/")
//   return response.data
// }

