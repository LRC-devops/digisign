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
  // if (state.loading) {
  //   return <LoadingSpinner loading={state.loading} />
  // }

  return (
    <main className="flex w-[100vw] h-[100vh] bg-[url('/bg.jpg')]">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
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
            <div className='flex flex-col p-10 justify-between align-middle w-full h-full z-0'>
              <TopBox token={token} />
              <ErrorBoundary>
                <SessionsWidget sessions={state.sessions} error={state.error} loading={state.loading} />
              </ErrorBoundary>
              <SnackBar {...state.snack} />
            </div>
          </>
        }
      </ErrorBoundary>
    </main>
  )
}


export default MainView
