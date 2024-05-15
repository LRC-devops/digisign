import { isScheduledSession } from "../components/sessions/session.model";
import { ICalendarSession, IScheduledSession } from "../components/sessions/types";
import { buildDate } from "./datetime";

export const filterSessionsWithinHour = (sessions: IScheduledSession[] | ICalendarSession[]) => {
  return sessions.filter((s) => {
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

  return now >= date
}
