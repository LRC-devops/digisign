import SessionsWidget from './components/sessions/SessionsWidget'
import TopBox from './components/topbox/TopBox'
import './index.css'
import ErrorBoundary from './components/error/ErrorBoundary'
import MaxAnns from './components/MaxAnns/MaxAnns'
import SnackBar from './components/SnackBar'
import { State, } from './app.reducer'
import useDigisign from './hooks/useDigisign'

const hasSessions = (state: State) => {
  console.log(state.sessions.length >= 1)
  return state.sessions.length >= 1;
}
function App() {
  const { state, dispatch } = useDigisign()

  return (
    <main className="flex w-[100vw] h-[100vh] bg-[url('/bg.jpg')]">
      {state.config.running || state.sessions.length < 1 ?
        <ErrorBoundary>
          {state.config && state.announcements.length > 0 &&
            <MaxAnns
              running={hasSessions(state) ? state.config.running : true}
              setRunning={hasSessions(state) ? (running: boolean) => {
                return dispatch({ type: "setAnnouncementsRunning", payload: running })
              } : () => { }}
              // config={hasSessions(state) ? state.config : { ...state.config, totalPages: 1, count: state.rawAnnouncements.length, }}
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
