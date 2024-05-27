import { CalendarSession, ScheduledSession } from "../../src/components/sessions/session.model.ts"
import { RawSessions, RawSession } from "../../src/utils/sessions.filter.ts"
import data from "./data.ts";


export type Session = CalendarSession | ScheduledSession

type TArgs = {
  f?: (s: RawSession) => boolean
}

const getData = ({ f }: TArgs = {}): RawSessions => {
  let out: RawSessions = []
  for (let s of data as RawSessions) {

    if (s instanceof CalendarSession) {
      // alter the date to be whatever the caller is asking for (args) FIXME:
      out.push(s)
    } else {
      // alter the day and endDate to be whatever the caller is asking for (args) FIXME:
      out.push(s)
    }
  }
  if (f) {
    out = out.filter(f)
  }
  return out;
}

export default getData
