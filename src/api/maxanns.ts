import axios from "axios"
import { Config, MaxAnn } from "../components/MaxAnns/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getConfig = async (): Promise<Config | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/announcements/maximized/run-time`);
    return res.data;
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

export const getAnnouncements = async (): Promise<MaxAnn[] | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/announcements/maximized`);
    // return preloadAnns(res.data);
    return res.data;
  } catch (err) {
    console.error("[api/maxanns/getAnnouncements]: error: ", err)
    const error = err as Error;
    return new Error(`An error occurred fetching the maximized announcements from the server: ${error?.message}`)
  }
}
