import axios, { AxiosError } from "axios"
import API_BASE_URL from "./api-url"
export const getToken = async (uuid: string): Promise<string | Error> => {
  try {
    var res = await axios.post(`${API_BASE_URL}/auth/token`, {
      uuid: uuid,
      type: "DigiSign"
    })
    if (!res.data.token) {
      throw new Error("An error occurred retrieveing the device's authentication token.")
    }
    return res.data.token
  } catch (err) {
    console.error("[api/auth]: error getting token: ", err)
    const error = err as Error;
    return new Error(`Error sending device details to the server: ${error.message}`)
  }
}
type AuthState = {
  isAuth: boolean
  name: string
  uuid: string
}
const EmptyAuthState: AuthState = {
  isAuth: false,
  name: "",
  uuid: ""
}
export const getAuthState = async (token: string): Promise<AuthState | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth/state`, {
      headers: { Authorization: 'Barer ' + token },
    });
    const authState = res.data.state;
    return authState;
  } catch (err) {
    if (err instanceof AxiosError && err?.response?.status === 403) {
      return EmptyAuthState
    }
    console.error("[api/auth]: error getting authState: ", err)
    const error = err as Error;
    return new Error(`Error getting the device's authentication state from the server: ${error.message}`)
  };
}
