import axios from "axios"
import { THour } from "../components/topbox/hours/types";
import API_BASE_URL from "./api-url";

export const getHours = async (token: string): Promise<THour[] | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/hours`, {
      headers: { Authorization: 'Barer ' + token },
    });
    return res.data
  } catch (err) {
    console.error("[api/minanns/getHours]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred fetching the Hours Data from the server: ${error?.message}`)
  }
}
