import { useEffect, useState } from 'react'
import SessionsWidget from './components/sessions/SessionsWidget'
import TopBox from './components/topbox/TopBox'
import './index.css'
import { getSessions } from './api/sessions'
import { ICalendarSession, ISession } from './components/sessions/types'
import { ComponentError } from './components/error/types'
import { CalendarSession, ScheduledSession, isScheduledSession } from './components/sessions/session.model'
import { isDiffV2 } from './utils/stateDiff'
import ErrorBoundary from './components/error/ErrorBoundary'
import { getConfig } from './api/maxanns'
import { Config } from './components/MaxAnns/types'
import MaxAnns from './components/MaxAnns/MaxAnns'

const initalizeSessionClasses = async (sessions: ISession[]): Promise<(ScheduledSession | CalendarSession)[]> => {
  let out = [];
  for (let s of sessions) {
    let session = null;
    if (isScheduledSession(s)) {
      session = new ScheduledSession(s);
    } else {
      session = new CalendarSession(s as ICalendarSession)
    }
    await session.initalize();
    out.push(session);
  }
  return out;
}
function App() {
  const [loading, setLoading] = useState(false)
  const [sessions, setSessions] = useState<(ScheduledSession | CalendarSession)[]>([])
  const [error, setError] = useState<ComponentError>({ hasError: false, msg: "" })
  const [config, setConfig] = useState<Config | null>(null)
  const [runAnns, setRunAnns] = useState(true)

  // GET SESSIONS
  useEffect(() => {
    console.log("running useEffect")
    const getData = async () => {
      console.log("getting session data")
      try {
        // if there are sessions displayed no need to show loading spinner
        if (sessions.length < 1) {
          setLoading(true);
        }
        const res = await getSessions();
        if (res instanceof Error) {
          throw res;
        }
        if (isDiffV2(sessions, res)) {
          let _sessions = await initalizeSessionClasses(res);
          setSessions(_sessions)
        }
        if (sessions.length < 1) {
          setRunAnns(true)
        }
        // call session.initalize
        setLoading(false)
      } catch (err) {
        setLoading(false)
        const error = err as Error;
        setError({ hasError: true, msg: error.message || "An unknown error occurred" })
      }
    }

    const fetchConfig = async () => {
      console.log("getting config data")
      try {
        setLoading(true);
        const res = await getConfig()
        setLoading(false)
        if (res instanceof Error) {
          throw res;
        }
        const config: Config = {
          ...res,
          totalPages: Math.ceil(res.count / 3),
          currentPage: 1
        }
        setConfig(config)
      } catch (err) {
        setLoading(false)
        const error = err as Error;
        setError({ hasError: true, msg: error.message || "An unknown error occurred" })
      }
    }

    if (sessions.length < 1) {
      getData()
    }
    if (runAnns) {
      getData();
    }
    fetchConfig()
  }, [sessions])



  return (
    <main className="flex w-[100vw] h-[100vh] bg-[url('/bg.jpg')]">
      {runAnns ?
        <ErrorBoundary>
          <MaxAnns running={runAnns} setRunning={setRunAnns} config={config} />
        </ErrorBoundary>
        :
        <>
          <div className='flex flex-col p-10 justify-between align-middle w-full h-full z-0'>
            <TopBox />
          </div>
          <ErrorBoundary>
            <SessionsWidget sessions={sessions} error={error} loading={loading} />
          </ErrorBoundary>
        </>
      }
    </main>
  )
}

export default App
