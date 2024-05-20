import { useEffect, useReducer } from 'react'
import SessionsWidget from './components/sessions/SessionsWidget'
import TopBox from './components/topbox/TopBox'
import './index.css'
import ErrorBoundary from './components/error/ErrorBoundary'
import MaxAnns from './components/MaxAnns/MaxAnns'
import SnackBar from './components/SnackBar'
import { fetchAnnouncements, fetchConfig, fetchSessions } from './utils/app.utils'
import { initialState, reducer } from './app.reducer'

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
      dispatch({ type: "setAnnouncements", payload: _announcements.announcements })
      dispatch({
        type: "setConfig", payload: {
          ..._config, runtimes: _announcements.runtimes
        }
      })
      dispatch({ type: "setLoading", payload: false })
    }

    getAllData()
  }, [state.sessions])

  // announcements 
  useEffect(() => {
    if (!state.config) {
      return;
    }
    var duration = state.config.interval + (state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000);
    const announcementInterval = setInterval(async () => {
      console.log("setting runAnnouncements true")
      if (state.announcements.length > 1 && state.config) {
        // NOTE: shoud I group these together? update the page right before? 
        dispatch({ type: "setAnnouncementsRunning", payload: true })
        dispatch({ type: "nextAnnPage" })
      }
    }, duration)
    // }, (state.config.runtimes ? state.config.runtimes[state.config.currentPage] : 120000)) // dev timing
    const snackbarInterval = setInterval(() => {
      dispatch({ type: "setSnack", payload: { heading: "Announcements starting soon...", body: "Don't worry, the sessions will return shortly.", duration: 8000, open: true, isError: false } })
    }, duration - 9000)

    return () => {
      clearInterval(announcementInterval)
      clearInterval(snackbarInterval)
    }
  }, [state.config])



  return (
    <main className="flex w-[100vw] h-[100vh] bg-[url('/bg.jpg')]">
      {state.config.running || state.sessions.length < 1 ?
        <ErrorBoundary>
          {state.config && state.announcements.length > 0 &&
            <MaxAnns
              running={state.config.running}
              setRunning={(running: boolean) => dispatch({ type: "setAnnouncementsRunning", payload: running })}
              config={state.config}
              announcements={state.announcements[state.config.currentPage]} />
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
