import { useEffect, useReducer } from "react"
import { initialState, reducer } from "../app.reducer"
import { fetchAnnouncements, fetchConfig, fetchSessions } from "../utils/app.utils"

/*
 * NOTE: main logic for App.tsx
 */

export default function useDigisign(token: string) {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const { token } = useAuth()

  // GET ALL DATA
  useEffect(() => {
    const getAllData = async () => {
      dispatch({ type: "setLoading", payload: true })
      if (state.config.running) {
        const _sessions = await fetchSessions(state.sessions, token)
        if (_sessions instanceof Error) {
          dispatch({ type: "setError", payload: { hasError: true, msg: _sessions.message } })
        }
      }
      if (state.sessions.length < 1) {
        const _sessions = await fetchSessions(state.sessions, token)
        if (_sessions instanceof Error) {
          dispatch({ type: "setError", payload: { hasError: true, msg: _sessions.message } })
        } else if (_sessions) {
          dispatch({ type: "setSessions", payload: _sessions })
        }
      }
      const _config = await fetchConfig(token)
      if (_config instanceof Error) {
        return dispatch({ type: "setError", payload: { hasError: true, msg: _config.message } })
      }
      const _announcements = await fetchAnnouncements(token)
      if (_announcements instanceof Error) {
        return dispatch({ type: "setError", payload: { hasError: true, msg: _announcements.message } })
      }
      dispatch({ type: "setAnnouncements", payload: { announcements: _announcements.announcements, rawAnnouncements: _announcements.rawAnnouncements } })
      dispatch({
        type: "setConfig", payload: {
          ..._config, runtimes: _announcements.runtimes
        }
      })
      dispatch({ type: "setLoading", payload: false })
    }
    getAllData()
  }, [state.sessions])

  useEffect(() => {
    const revalidate = setInterval(async () => {
      const _sessions = await fetchSessions(state.sessions, token)
      if (_sessions instanceof Error) {
        dispatch({ type: "setError", payload: { hasError: true, msg: _sessions.message } })
      } else if (_sessions) {
        dispatch({ type: "setSessions", payload: _sessions })
      }
    }, 120000) // revalidate sessions every 2 mins (shouldn't be an issue with the way the server will cache this data.)
    return () => {
      clearInterval(revalidate)
    }
  }, [state.sessions])

  // announcements 
  useEffect(() => {
    if (!state.config || state.sessions.length < 1) {
      return;
    }
    var snack = {
      heading: "Announcements starting soon...",
      body: "Don't worry, the sessions will return shortly.",
      duration: 8000,
      open: true,
      isError: false
    }
    var resetSnack = {
      heading: "",
      body: "",
      duration: 0,
      open: false,
      isError: false
    }
    // var duration = 60000 + (state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000)// dev timing
    var duration = state.config.interval + (state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000); // prod timing // BUG: does this need to include the animation offset for each ann transition?
    var snackAnimationOffset = 5000
    let announcementTimeout: ReturnType<typeof setTimeout>;
    var snackTimeout = setTimeout(async () => {
      if (state.announcements.length > 1 && state.config) {

        dispatch({ type: "setSnack", payload: snack })
        console.log("[useDigisign]: running notification")
        announcementTimeout = setTimeout(async () => {
          console.log("[useDigisign]: running anns")
          dispatch({ type: "setAnnouncementsRunning", payload: true })
          dispatch({ type: "setSnack", payload: resetSnack })
        }, snack.duration + snackAnimationOffset)
      }
    }, duration - snack.duration + snackAnimationOffset)

    return () => {
      console.log("[useDigisign]: clearing timeouts ")
      clearTimeout(snackTimeout)
      clearTimeout(announcementTimeout)
    }
  }, [state.config, state.sessions, state.announcements])

  return { state, dispatch }
}
