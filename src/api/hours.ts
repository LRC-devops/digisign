import axios from "axios"
import { THour } from "../components/topbox/hours/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getHours = async (): Promise<THour[] | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/hours`);
    return res.data
  } catch (err) {
    console.error("[api/minanns/getHours]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred fetching the Hours Data from the server: ${error?.message}`)
  }
}
