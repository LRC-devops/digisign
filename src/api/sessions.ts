import axios from "axios"
import { filterSessionsWithinHour } from "../utils/sessions.filter";

const API_BASE_URL = import.meta.env.VITE_API_URL;


export const getSessions = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/sessions/`);
    return filterSessionsWithinHour(res.data);
  } catch (err) {
    console.error("[api/sessions/getSessions]: error: ", err);
    const error = err as Error;
    return new Error(`An error occurred fetching the Sessions from the server: ${error?.message}`)
  }
}
