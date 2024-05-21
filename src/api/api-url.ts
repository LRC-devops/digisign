const getBaseUrl = (): string => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_PROD_API_URL
  }
  return import.meta.env.VITE_DEV_API_URL
}

const API_BASE_URL = getBaseUrl()

export default API_BASE_URL;
