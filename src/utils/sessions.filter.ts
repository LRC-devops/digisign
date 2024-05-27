import { isScheduledSession } from "../components/sessions/session.model";
import { ICalendarSession, IScheduledSession } from "../components/sessions/types";
import { buildDate } from "./datetime";

type RawSessions = (ICalendarSession | IScheduledSession)[]
type RawSession = ICalendarSession | IScheduledSession

export const sortSessions = (sessions: RawSessions): void => {
  sessions.sort((a, b) => {
    let aStart, bStart: Date;
    if (isScheduledSession(a)) {
      aStart = buildDate(a.startTime);
    } else {
      aStart = new Date(a.date)
    }
    if (isScheduledSession(b)) {
      bStart = buildDate(b.startTime)
    } else {
      bStart = new Date(b.date)
    }
    return aStart.getTime() - bStart.getTime()
  })
}

export const filterSessionsWithinHour = (sessions: RawSessions) => {
  sortSessions(sessions);
  return sessions.filter((s: RawSession) => {
    if (isScheduledSession(s)) {
      return isScheduledSessionWithinHour(s)
    }
    return isCalendarSessionWithinHour(s)
  })
}

const isScheduledSessionWithinHour = (s: IScheduledSession): boolean => {
  var now = new Date();
  var start = buildDate(s.startTime)
  start.setHours(start.getHours() - 1)
  var end = buildDate(s.endTime)

  return now <= end && now >= start
}
const isCalendarSessionWithinHour = (s: ICalendarSession): boolean => {
  var now = new Date();
  var date = new Date(s.date);
  date.setHours(date.getHours() - 1)
  //BUG: this does not seem to take care of sessions in the past, however this may be handled by API

  return now >= date
}
