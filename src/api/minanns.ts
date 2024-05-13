import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getMinAnns = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/announcements/minimized`);
    return res.data
  } catch (err) {
    console.error("[api/minanns/getMinAnns]: error: ", err)
  }
}
