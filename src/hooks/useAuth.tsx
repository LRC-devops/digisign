import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { getAuthState, getToken } from "../api/auth";
import { ComponentError } from "../components/error/types";

const useAuth = () => {
  const [token, setToken] = useState<string>("")
  const [uuid, setUuid] = useState<null | string>(null)
  const [error, setError] = useState<ComponentError>({ hasError: false, msg: "" })
  const [isAuth, setIsAuth] = useState(false)
  const [name, setName] = useState("")
  // NOTE: may need a way to reinit this hook once call storeToken

  const generateUuid = (): string => {
    const _uuid = uuidv4()
    return _uuid
  }

  const storeItem = (key: string, token: string): void => {
    sessionStorage.setItem(key, JSON.stringify(token))
    setToken(token) // NOTE: or this may solve need to reinit (mentioned above)
    return
  }

  const getItem = (key: string): null | string => {
    var tokenStr = sessionStorage.getItem(key)
    if (!tokenStr) {
      return null;
    }
    var deviceToken = JSON.parse(tokenStr);
    return deviceToken
  }
  // get uuid
  useEffect(() => {
    var storedUuid = getItem("uuid");
    if (!storedUuid) {
      var _uuid = generateUuid();
      storeItem("uuid", _uuid)
      setUuid(_uuid)
    } else {
      setUuid(storedUuid)
    }
  }, [])
  // get token
  useEffect(() => {
    if (!uuid) {
      return;
    }
    const fetchToken = async () => {
      var storedToken = getItem("token")
      if (!storedToken) {
        var token = await getToken(uuid)
        if (token instanceof Error) {
          return setError({ hasError: true, msg: token.message || "An unknown error occurred" })
        }
        storeItem("token", token)
        setToken(token)
      } else {
        setToken(storedToken)
      }
    }
    fetchToken()
  }, [uuid])
  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchAuthState = async () => {
      var authState = await getAuthState(token)
      if (authState instanceof Error) {
        return setError({ hasError: true, msg: authState.message || "An unknown error occurred" })
      }
      setIsAuth(authState.isAuth)
      setName(authState.name)
    }
    fetchAuthState()
  }, [token])

  return { token, uuid, error, isAuth, name }
}

export default useAuth; 
