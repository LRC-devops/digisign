import { useEffect, useReducer } from "react";
import { ComponentError } from "../error/types";
import SessionCard from "./SessionCard";
import ErrorBoundary from "../error/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import ProgressBars from "../pages/ProgressBars";
import { CalendarSession, ScheduledSession } from "./session.model";

interface State {
  sessions: (ScheduledSession | CalendarSession)[][];
  durations: number[]
  curr: number;
}
type Action =
  | { type: 'next' }
  | { type: 'setSessions', payload: (ScheduledSession | CalendarSession)[][] }


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "next":
      const curr = (state.curr + 1) % state.sessions.length;
      return {
        ...state, curr: curr
      }
    case "setSessions":
      var durations = action.payload.map((_, idx) => {
        switch (idx) {
          case 0:
            return 15000
          case 1:
            return 10000
          case 2:
            return 8000
          default:
            return 6000
        }
      })
      return { ...state, sessions: action.payload, durations }
  }
}

const formatSessionsPages = (sessions: (ScheduledSession | CalendarSession)[]): (ScheduledSession | CalendarSession)[][] => {
  var out: (ScheduledSession | CalendarSession)[][] = [];

  let count = 0;
  const PAGE_SIZE = 6;
  let page: (ScheduledSession | CalendarSession)[] = [];
  for (let s of sessions) {
    if (page.length >= PAGE_SIZE) {
      out.push(page);
      page = [];
      count = 0;
    }
    page.push(s);
    count++
  }
  if (page.length > 0) {
    out.push(page)
  }
  return out;
}

type Props = {
  sessions: (ScheduledSession | CalendarSession)[]
  error: ComponentError,
  loading: boolean
  setError: (msg: string) => void
}
const initialState: State = {
  sessions: [],
  curr: 0,
  durations: [15000]
}
const SessionsWidget = ({ sessions, error, setError }: Props) => {
  if (error.hasError && sessions.length < 1) {
    throw new Error(error.msg || "An unknown error occurred")
  } else if (error.hasError && sessions.length > 0) { // if sessions.length > 0
    setError(error.msg || "An unknown error occurred.")
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  // const DURATION = 15000

  useEffect(() => {
    dispatch({ type: 'setSessions', payload: formatSessionsPages(sessions) })
  }, [sessions])



  useEffect(() => {
    if (state.sessions.length < 1) {
      return;
    }
    console.log("[SessionsWidget]: next...", state.durations, state.durations[state.curr])
    var timeout = setTimeout(() => {
      dispatch({ type: 'next' })
    }, state.durations[state.curr])
    return () => {
      clearTimeout(timeout)
    }
  }, [state.sessions.length, state.durations, state.curr])



  if (state.sessions.length < 1) {
    return <h3>Notion to see here...</h3>
  }




  return <div className="w-full h-full pt-10 flex flex-col gap-3">
    <ErrorBoundary>
      {state.sessions.length > 1 &&
        <ProgressBars
          currentIdx={state.curr}
          // bars={state.sessions.map((_: any) => DURATION)}
          bars={state.durations}
        />
      }
      <div className="w-full h-full flex flex-wrap justify-between gap-3">
        {state.sessions[state.curr].map((s: (CalendarSession | ScheduledSession), idx: number) => (
          <AnimatePresence key={idx}>
            <SessionCard delay={idx / 10} session={s} key={idx} />
          </AnimatePresence>
        ))}
      </div>
    </ErrorBoundary>
  </div>

}

export default SessionsWidget;
