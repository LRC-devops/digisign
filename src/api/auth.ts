import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_API_URL;
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
    const error = err as Error;
    return new Error(`Error sending new device details to the server: ${error.message}`)
  }
}
type AuthState = {
  isAuth: boolean
  name: string
  uuid: string
}
export const getAuthState = async (token: string): Promise<AuthState | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth/state`, {
      headers: { Authorization: 'Barer ' + token },
    });
    const authState = res.data.state;
    return authState;
  } catch (err) {
    const error = err as Error;
    return new Error(`Error getting the device's authentication state fromthe server: ${error.message}`)
  };
}
