// let API_BASE_URL = import.meta.env.VITE_DEV_API_URL;
//
// if (import.meta.env.PROD) {
//
//   API_BASE_URL = import.meta.env.VITE_API_URL;
// }

const getBaseUrl = (): string => {
  // if (import.meta.env.PROD) {
  console.log(import.meta.env.VITE_PROD_API_URL)
  return import.meta.env.VITE_PROD_API_URL
  // }
  //
  // console.log(import.meta.env.VITE_DEV_API_URL)
  // return import.meta.env.VITE_DEV_API_URL
}

const API_BASE_URL = getBaseUrl()

export default API_BASE_URL;
