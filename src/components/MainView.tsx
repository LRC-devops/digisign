import { State } from "../app.reducer";
import useDigisign from "../hooks/useDigisign";
import LoadingSpinner from "./LoadingSpinner";
import MaxAnns from "./MaxAnns/MaxAnns";
import SnackBar from "./SnackBar";
import ErrorBoundary from "./error/ErrorBoundary";
import SessionsWidget from "./sessions/SessionsWidget";
import TopBox from "./topbox/TopBox";

const hasSessions = (state: State) => {
  return state.sessions.length >= 1;
}
type Props = {
  token: string
}
const MainView = ({ token }: Props) => {
  const { state, dispatch } = useDigisign(token)

  const setSnackError = (msg: string) => {
    return {
      heading: "Oops...",
      body: msg,
      duration: 12000,
      open: true,
      isError: true
    }

  }

  return (
    <main className="flex w-full h-full bg-[url('/bg.jpg')]">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center overflow-hidden">
        <LoadingSpinner loading={state.loading} />
      </div>
      <ErrorBoundary>
        {state.config.running || state.sessions.length < 1 ?
          <ErrorBoundary>
            {state.config && state.announcements.length > 0 &&
              <MaxAnns
                running={hasSessions(state) ? state.config.running : true}
                setRunning={hasSessions(state) ? (running: boolean) => {
                  return dispatch({ type: "setAnnouncementsRunning", payload: running })
                } : () => { }}
                announcements={hasSessions(state) ? state.announcements[state.config.currentPage] : state.rawAnnouncements} />
            }
          </ErrorBoundary>
          :
          <>
            <div className='flex flex-col p-5 justify-between align-middle w-full h-full z-0'>
              <TopBox token={token} />
              <ErrorBoundary>
                <SessionsWidget sessions={state.sessions} error={state.error} setError={(msg: string) => setSnackError(msg)} loading={state.loading} />
              </ErrorBoundary>
              <SnackBar {...state.snack} />
            </div>
          </>
        }
      </ErrorBoundary>
      {/* <div className="absolute bottom-0 left-0 right-0 bg-black"><p>{JSON.stringify(state)}</p></div> */}
    </main>
  )
}


export default MainView
