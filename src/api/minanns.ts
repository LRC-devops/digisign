import axios from "axios"
import { MinimizedAnnouncement } from "../components/topbox/MinAnns/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getMinAnns = async (): Promise<MinimizedAnnouncement[] | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/announcements/minimized`);
    return res.data
  } catch (err) {
    console.error("[api/minanns/getMinAnns]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred fetching the Minimum Announcement Data from the server: ${error?.message}`)
  }
}
