import { useEffect, useReducer } from "react";
import { ComponentError } from "../error/types";
import LoadingSpinner from "../LoadingSpinner";
import SessionCard from "./SessionCard";
import ErrorBoundary from "../error/ErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBars from "../pages/ProgressBars";
import { CalendarSession, ScheduledSession } from "./session.model";

interface State {
  sessions: (ScheduledSession | CalendarSession)[][];
  curr: number;
}
type Action =
  | { type: 'next' }
  | { type: 'setSessions', payload: (ScheduledSession | CalendarSession)[] }


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "next":
      const curr = (state.curr + 1) % state.sessions.length;
      return {
        ...state, curr: curr
      }
    case "setSessions":
      return { ...state, sessions: action.payload }
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

const DURATION = 12000
type Props = {
  sessions: (ScheduledSession | CalendarSession)[]
  error: ComponentError,
  loading: boolean
}
const initialState: State = {
  sessions: [],
  curr: 0,
}
const SessionsWidget = ({ sessions, error, loading }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log("updaing sessions and rerendering")
    dispatch({ type: 'setSessions', payload: formatSessionsPages(sessions) })
  }, [sessions])

  console.log("sessions rerendered", state)

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.sessions.length > 1) {
        dispatch({ type: "next" })
      }
    }, DURATION)

    return () => {
      clearInterval(interval)
    }
  }, [])



  if (error.hasError) {
    throw new Error(error.msg || "An unknown error occurred")
  }
  if (state.sessions.length < 1) {
    return <h3>Notion to see here...</h3>
  }
  if (loading) {
    return <LoadingSpinner loading={loading} />
  }



  return <div className="w-full h-full pt-10 flex flex-col gap-3">
    <ErrorBoundary>
      {state.sessions.length > 1 &&
        <ProgressBars
          currentIdx={state.curr}
          bars={state.sessions.map((_: any) => DURATION)}
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
