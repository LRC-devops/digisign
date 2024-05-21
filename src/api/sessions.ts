import axios from "axios"
import { filterSessionsWithinHour } from "../utils/sessions.filter";

const API_BASE_URL = import.meta.env.VITE_API_URL;


export const getSessions = async (token: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/sessions/`, {
      headers: { Authorization: 'Barer ' + token },
    });
    return filterSessionsWithinHour(res.data);
  } catch (err) {
    const error = err as Error;
    console.error("[api/sessions/getSessions]: error: ", error.message);
    return new Error(`An error occurred fetching the Sessions from the server: ${error?.message}`)
  }
}
