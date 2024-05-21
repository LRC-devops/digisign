import axios from "axios"
import { MinimizedAnnouncement } from "../components/topbox/MinAnns/types";
import API_BASE_URL from "./api-url";


export const getMinAnns = async (token: string): Promise<MinimizedAnnouncement[] | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/announcements/minimized`, {
      headers: { Authorization: 'Barer ' + token },
    });
    return res.data
  } catch (err) {
    console.error("[api/minanns/getMinAnns]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred fetching the Minimum Announcement Data from the server: ${error?.message}`)
  }
}
