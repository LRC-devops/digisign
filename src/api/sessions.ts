import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL;


export const getSessions = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/sessions/`);
    return res.data
  } catch (err) {
    console.error("[api/sessions/getSessions]: error: ", err);
    const error = err as Error;
    return new Error(`An error occurred fetching the Sessions from the server: ${error?.message}`)
  }
}
