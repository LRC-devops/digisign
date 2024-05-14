import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL;

export type UPPhoto = {
  url: string;
  credits: string;
}
type UPRes = {
  user: {
    first_name: string,
    last_name: string
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
    console.log(data)
    const photo: UPPhoto = {
      url: data.urls.regular,
      credits: `${data.user.first_name} ${data.user.last_name}`
    }
    return photo
  } catch (err) {
    console.error("[api/photo/getUPPhoto]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred querying a photo from the server: ${error.message}`)
  }
}
