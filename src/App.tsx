import { useEffect, useReducer } from 'react'
import SessionsWidget from './components/sessions/SessionsWidget'
import TopBox from './components/topbox/TopBox'
import './index.css'
import ErrorBoundary from './components/error/ErrorBoundary'
import MaxAnns from './components/MaxAnns/MaxAnns'
import SnackBar from './components/SnackBar'
import { fetchAnnouncements, fetchConfig, fetchSessions } from './utils/app.utils'
import { State, initialState, reducer } from './app.reducer'

const hasSessions = (state: State) => {
  console.log(state.sessions.length >= 1)
  return state.sessions.length >= 1;
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // GET ALL DATA
  useEffect(() => {
    console.log("running useEffect")
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
    var duration = state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000// dev timing
    // var duration = state.config.interval + (state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000); // prod timing
    var announcementInterval = setInterval(async () => {
      let announcementTimeout = setTimeout(() => { })
      if (state.announcements.length > 1 && state.config) {

        dispatch({ type: "setSnack", payload: snack })
        announcementTimeout = setTimeout(async () => {
          dispatch({ type: "setAnnouncementsRunning", payload: true })
        }, snack.duration + 1000)
      }
      return () => {
        clearTimeout(announcementTimeout)
      }
    }, duration - snack.duration + 1000)

    return () => {
      clearInterval(announcementInterval)
    }
  }, [state.config])



  return (
    <main className="flex w-[100vw] h-[100vh] bg-[url('/bg.jpg')]">
      {state.config.running || state.sessions.length < 1 ?
        <ErrorBoundary>
          {state.config && state.announcements.length > 0 &&
            <MaxAnns
              running={hasSessions(state) ? state.config.running : true}
              setRunning={hasSessions(state) ? () => (running: boolean) => dispatch({ type: "setAnnouncementsRunning", payload: running }) : () => { }}
              config={hasSessions(state) ? state.config : { ...state.config, totalPages: 1, count: state.rawAnnouncements.length, }}
              announcements={hasSessions(state) ? state.announcements[state.config.currentPage] : state.rawAnnouncements} />
          }
        </ErrorBoundary>
        :
        <>
          <div className='flex flex-col p-10 justify-between align-middle w-full h-full z-0'>
            <TopBox />
            <ErrorBoundary>
              <SessionsWidget sessions={state.sessions} error={state.error} loading={state.loading} />
            </ErrorBoundary>
            <SnackBar {...state.snack} />
          </div>
        </>
      }
    </main>
  )
}

export default App
