import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getHours = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/hours`);
    return res.data
  } catch (err) {
    console.error(err)
  }
}
