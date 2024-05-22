import axios from "axios"
import { Config, MaxAnn } from "../components/MaxAnns/types";
import API_BASE_URL from "./api-url";


export const getConfig = async (token: string): Promise<Config | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/announcements/maximized/run-time`, {
      headers: { Authorization: 'Barer ' + token },
    }
    );
    return { ...res.data, interval: res.data.config.interval }
  } catch (err) {
    console.error("[api/maxanns/getConfig]: error: ", err)
    const error = err as Error
    return new Error(`An error occurred fetching the app config from the server: ${error?.message}`)
  }
}

export const preloadAnns = async (anns: MaxAnn[]): Promise<MaxAnn[] | Error> => {
  const out: MaxAnn[] = [];
  try {
    for (let a of anns) {
      var img = new Image();
      img.src = a.imageUrl
      img.crossOrigin = "anonymous"
      a.image = img
      out.push(a);
    }
    return out;

  } catch (err) {
    const error = err as Error;
    console.error("[api/maxanns/preloadAnns]: error: ", err)
    return new Error(`Error pre-loading the maximum announcement images: ${error?.message}`)
  }

}

export const getAnnouncements = async (token: string): Promise<MaxAnn[] | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/announcements/maximized`, {
      headers: { Authorization: 'Barer ' + token },
    }
    );
    return res.data;
  } catch (err) {
    console.error("[api/maxanns/getAnnouncements]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred fetching the maximized announcements from the server: ${error?.message}`)
  }
}
