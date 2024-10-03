import axios from "axios"
import API_BASE_URL from "./api-url";


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

export const getUPPhoto = async (query: string, token: string): Promise<UPPhoto | Error> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/photo/${query}`, {
      headers: { Authorization: 'Barer ' + token },
    });
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

/**
 * A query attribute was added to the server endpoint allowing for a JSON response with the url to avoid the redirect for this exact issue.
 * Updated: 10.03.2024
 */
export async function resolveAWSPhotoRedirect(uri: string): Promise<string | undefined | Error> {
  try {
    if (!uri.includes(API_BASE_URL)) {
      return
    }

    const res = await axios.get(`${uri}?no-redirect=true`)
    const url = res?.data?.url
    if (!url) throw new Error("API response was missing the expected 'url' attribute.")
    return url
  } catch (err) {
    console.error("[api/photo/resolveAWSPhotoRedirect]: error: ", err)
    const error = err as Error
    return new Error(`An error occurred resolving the AWS redirect: ${error.message}`)
  }
}
