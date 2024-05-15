import { useEffect, useState } from 'react'
import SessionsWidget from './components/sessions/SessionsWidget'
import TopBox from './components/topbox/TopBox'
import './index.css'
import { getSessions } from './api/sessions'
import { ICalendarSession, ISession } from './components/sessions/types'
import { ComponentError } from './components/error/types'
import { CalendarSession, ScheduledSession, isScheduledSession } from './components/sessions/session.model'
import { isDiffV2 } from './utils/stateDiff'
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
        // if there are sessions displayed no need to show loading spinner
        if (sessions.length < 1) {
          setLoading(true);
        }
        const res = await getSessions();
        if (res instanceof Error) {
          throw res;
        }
        if (isDiffV2(sessions, res)) {
          console.log("diff")
          let _sessions = await initalizeSessionClasses(res);
          setSessions(_sessions)
        } else {
          console.log("no diff")
        }
        // call session.initalize
        setLoading(false)
      } catch (err) {
        setLoading(false)
        const error = err as Error;
        setError({ hasError: true, msg: error.message || "An unknown error occurred" })
      }
    }

    if (sessions.length < 1) {
      console.log("getting initial data")
      getData()
    }

    // const interval = setInterval(async () => {
    //   console.log("revalidaing")
    //   await getData();
    // }, 150000)
    //
    // return () => {
    //   clearInterval(interval)
    // }

  }, [sessions])

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
