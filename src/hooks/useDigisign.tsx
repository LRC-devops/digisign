import { useEffect, useReducer } from "react"
import { initialState, reducer } from "../app.reducer"
import { fetchAnnouncements, fetchConfig, fetchSessions } from "../utils/app.utils"

/*
 * NOTE: main logic for App.tsx
 */

export default function useDigisign() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // GET ALL DATA
  useEffect(() => {
    const getAllData = async () => {
      dispatch({ type: "setLoading", payload: true })
      if (state.config.running) {
        const _sessions = await fetchSessions(state.sessions)
        if (_sessions instanceof Error) {
          dispatch({ type: "setError", payload: { hasError: true, msg: _sessions.message } })
        }
      }
      if (state.sessions.length < 1) {
        const _sessions = await fetchSessions(state.sessions)
        if (_sessions instanceof Error) {
          dispatch({ type: "setError", payload: { hasError: true, msg: _sessions.message } })
        } else if (_sessions) {
          dispatch({ type: "setSessions", payload: _sessions })
        }
      }
      const _config = await fetchConfig()
      if (_config instanceof Error) {
        return dispatch({ type: "setError", payload: { hasError: true, msg: _config.message } })
      }
      const _announcements = await fetchAnnouncements()
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
      console.log("revalidating session data")
      const _sessions = await fetchSessions(state.sessions)
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
      console.log("early announcements interval return due to no config or no sessions")
      return;
    }
    var snack = { heading: "Announcements starting soon...", body: "Don't worry, the sessions will return shortly.", duration: 8000, open: true, isError: false }
    // var duration = state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000// dev timing
    var duration = state.config.interval + (state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000); // prod timing
    var snackAnimationOffset = 5000
    var announcementInterval = setInterval(async () => {
      let announcementTimeout = setTimeout(() => { })
      if (state.announcements.length > 1 && state.config) {

        console.log("setting snack")
        dispatch({ type: "setSnack", payload: snack })
        announcementTimeout = setTimeout(async () => {
          console.log("running announcements")
          dispatch({ type: "setAnnouncementsRunning", payload: true })
        }, snack.duration + snackAnimationOffset)
      }
      return () => {
        clearTimeout(announcementTimeout)
      }
    }, duration - snack.duration + snackAnimationOffset)

    return () => {
      clearInterval(announcementInterval)
    }
  }, [state.config])

  return { state, dispatch }
}
