import { ENVIRONMENT } from "./env"

const API_URLS: { [key: string]: string } = {
  development: "http://192.168.0.42:8080",
  production: "https://lrc-api.wm.r.appspot.com"
}
const API_URL = API_URLS[ENVIRONMENT] || (() => { throw new Error(`Unknown environment variable: ${ENVIRONMENT}`) })


export {
  API_URL,
  ENVIRONMENT
}
