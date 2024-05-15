import { useEffect, useState } from 'react'
import SessionsWidget from './components/sessions/SessionsWidget'
import TopBox from './components/topbox/TopBox'
import './index.css'
import { getSessions } from './api/sessions'
import { ICalendarSession, ISession } from './components/sessions/types'
import { ComponentError } from './components/error/types'
import { CalendarSession, ScheduledSession, isScheduledSession } from './components/sessions/session.model'
/*
  * TODO:
  * Top Widgets:
  *   Time
  *   Min Anns
  *   Hours
  * Main:
  *   Sessions
  *   Max Announcements
  * Authentication
  * Cacheing
  *
  * BUG:
  * need to test cacheing with chromecast!! May be a major reason to switch to raspberrypi
  * Also should research tradeoffs for using the mem card with raspberrypi vs using ext storage (more viable for long term?)
*/

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

  // GET SESSIONS
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("refetching data...")
        setLoading(true);
        const res = await getSessions();
        if (res instanceof Error) {
          throw res;
        }

        // call session.initalize
        let _sessions = await initalizeSessionClasses(res);
        setSessions(_sessions)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        const error = err as Error;
        setError({ hasError: true, msg: error.message || "An unknown error occurred" })
      }
    }
    getData()

  }, [])

  return (
    <main className="flex w-[100vw] h-[100vh] p-10 bg-[url('/bg.jpg')]">
      <div className='flex flex-col justify-between align-middle w-full h-full z-0'>
        <TopBox />
        {sessions.length > 0 &&
          <SessionsWidget sessions={sessions} error={error} loading={loading} />
        }
      </div>
    </main>
  )
}

export default App
