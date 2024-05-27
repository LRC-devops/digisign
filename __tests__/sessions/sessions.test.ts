// import { CalendarSession, ScheduledSession, isScheduledSession } from "../../src/components/sessions/session.model"
// import { ICalendarSession, IScheduledSession } from "../../src/components/sessions/types"
// import { RawSession } from "../../src/utils/sessions.filter"
// import getData from "./getData"

jest.mock('../../src/env/env', () => ({
  ENVIRONMENT: "development",
}))
import { API_URL, ENVIRONMENT } from "../../src/env/constants"

describe("TESTING ENV VARS", () => {

  test("API_URL should be dev", () => {
    console.log(API_URL, ENVIRONMENT)
    expect(ENVIRONMENT).toBe("development");
    expect(API_URL).toBe('http://192.168.0.42:8080')
  })
})

// const calendarSessionFilter = (s: RawSession) => {
//   return s.type === "calendars"
// }
// const scheduledSessionFilter = (s: RawSession) => {
//   return s.type === "schedules"
// }
//
// describe("Test session models", () => {
//   test("Calendar sessions filter out past sessions", () => {
//     const calData = getData({ f: calendarSessionFilter })
//     console.log(calData)
//
//   })
// })
