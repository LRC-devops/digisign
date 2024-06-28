import { isScheduledSession } from "../components/sessions/session.model";
import { ICalendarSession, IScheduledSession } from "../components/sessions/types";
import { buildDate } from "./datetime";

type RawSessions = (ICalendarSession | IScheduledSession)[]
type RawSession = ICalendarSession | IScheduledSession

/*
 * Sorts sessions based on their distance from now
 * So sessions which have just started or are about to start appear at the front of the first page.
 * FIXME: If the most important info is on the first page, should the durations of subsequent pages diminish?
 */
export const sortSessions = (sessions: RawSessions): void => {
  sessions.sort((a, b) => {
    var now = new Date();
    let aDistToNow = 0;
    let bDistToNow = 0;
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
    aDistToNow = Math.abs(now.valueOf() - aStart.valueOf())
    bDistToNow = Math.abs(now.valueOf() - bStart.valueOf())
    return aDistToNow - bDistToNow
  })
}

export const filterSessionsWithinHour = (sessions: RawSessions) => {
  sortSessions(sessions);
  return sessions.filter((s: RawSession) => {
    if (s.mode !== "in-person") {
      return;
    }
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
