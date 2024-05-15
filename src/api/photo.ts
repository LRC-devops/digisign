import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL;

export type UPPhoto = {
  url: string;
  credits: string;
}
type UPRes = {
  user: {
    name: string
  },
  urls: {
    small: string;
    regular: string;
  }
}

export const getUPPhoto = async (query: string): Promise<UPPhoto | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/photo/${query}`);
    const data: UPRes = res.data;
    if (!data.urls) {
      return {
        url: "",
        credits: ""
      }
    }
    const photo: UPPhoto = {
      url: data.urls.regular,
      credits: `${data.user.name}`
    }
    return photo
  } catch (err) {
    console.error("[api/photo/getUPPhoto]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred querying a photo from the server: ${error.message}`)
  }
}
