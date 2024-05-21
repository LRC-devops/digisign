import axios from "axios"
import { filterSessionsWithinHour } from "../utils/sessions.filter";
import API_BASE_URL from "./api-url";

export const getSessions = async (token: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/sessions/`, {
      headers: { Authorization: 'Barer ' + token },
    });
    if (res.data.length < 1) {
      throw new Error("No sessions found...")
    }
    return filterSessionsWithinHour(res.data);
  } catch (err) {
    const error = err as Error;
    console.error("[api/sessions/getSessions]: error: ", error.message);
    return new Error(`An error occurred fetching the Sessions from the server: ${error?.message}`)
  }
}
