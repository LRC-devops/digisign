import { CalendarSession, ScheduledSession } from "../../components/sessions/session.model";
import { build24Time } from "../../utils/datetime";
import { filterSessionsWithinHour, sortSessions } from "../../utils/sessions.filter";
import { calendarSession, scheduledSession } from "../data/sessions.data";
import axios from "axios"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("Should correctly filter out !Current Calendar Sessions", () => {
  test("Should keep session with date=now", () => {
    const session = calendarSession
    session.date = new Date();
    const sessions = filterSessionsWithinHour([session])
    expect(sessions).toHaveLength(1)
  })
  test("Should remove session with date > 1 hour in the future", () => {
    const session = calendarSession
    const date = new Date();
    date.setHours(date.getHours() + 2)
    session.date = date;
    const sessions = filterSessionsWithinHour([session])
    expect(sessions).toHaveLength(0)
  })
})
describe("Should correctly filter out !Current Scheduled Sessions", () => {
  test("Should keep session with startTime = now, endTime = now +1hr", () => {
    const start = new Date();
    start.setHours(start.getHours() - 1)
    const end = new Date();
    end.setHours(end.getHours() + 1)
    const session = scheduledSession
    session.startTime = build24Time(start);
    session.endTime = build24Time(end)
    const sessions = filterSessionsWithinHour([session])
    expect(sessions).toHaveLength(1)
  })
  test("Should remove session with startTime = past, endTime = now -2hr", () => {
    const start = new Date();
    start.setHours(start.getHours() - 3)
    const end = new Date();
    end.setHours(end.getHours() - 2)
    const session = scheduledSession
    session.startTime = build24Time(start);
    session.endTime = build24Time(end)
    const sessions = filterSessionsWithinHour([session])
    expect(sessions).toHaveLength(0)
  })
  test("Should remove session with startTime = future, endTime = future", () => {
    const start = new Date();
    start.setHours(start.getHours() + 3)
    const end = new Date();
    end.setHours(end.getHours() + 5)
    const session = scheduledSession
    session.startTime = build24Time(start);
    session.endTime = build24Time(end)
    const sessions = filterSessionsWithinHour([session])
    expect(sessions).toHaveLength(0)
  })
  test("Should correctly sort session by startTime", () => {
    const s1 = { ...scheduledSession };
    const s2 = { ...scheduledSession };
    const s3 = { ...scheduledSession };

    var baseDate = new Date();
    var s1Start = new Date(baseDate);
    s1Start.setMinutes(baseDate.getMinutes() + 1)
    var s2Start = new Date(baseDate);
    s2Start.setMinutes(baseDate.getMinutes() + 2)
    var s3Start = new Date(baseDate);
    s3Start.setMinutes(baseDate.getMinutes() - 5)

    s1.startTime = build24Time(s1Start)
    s2.startTime = build24Time(s2Start)
    s3.startTime = build24Time(s3Start)

    const unsorted = [s3, s2, s1]
    sortSessions(unsorted)
    const sorted = [s1, s2, s3]
    expect(unsorted[0]).toStrictEqual(sorted[0])
    expect(unsorted[1]).toStrictEqual(sorted[1])
    expect(unsorted[2]).toStrictEqual(sorted[2])
  })
})

describe("Session Class should correctly calc cancellations", () => {
  test("Should mark Calendar session as Cancelled", () => {
    let _session = calendarSession;
    _session.isCancelled = true
    const session = new CalendarSession(_session);
    expect(session.isCancelled()).toBe(true)
  })
  test("Should not mark Calendar session as Cancelled", () => {
    let _session = calendarSession;
    _session.isCancelled = false
    const session = new CalendarSession(_session);
    expect(session.isCancelled()).toBe(false)
  })
  test("Should mark Scheduled session as Cancelled", () => {
    let _session = scheduledSession;
    const start = new Date();
    start.setHours(start.getHours() - 1)
    const end = new Date();
    end.setHours(end.getHours() + 1)
    _session.initCancel = start
    _session.revertCancel = end
    const session = new ScheduledSession(_session);
    expect(session.isCancelled()).toBe(true)
  })
  test("Should not mark Scheduled session as Cancelled", () => {
    let _session = scheduledSession;
    const start = 0
    const end = 0
    _session.initCancel = start
    _session.revertCancel = end
    const session = new ScheduledSession(_session);
    expect(session.isCancelled()).toBe(false)
  })
})

describe("Schedule calss should correctly calculate temp sessions", () => {
  test("Should mark session as temp", () => {
    let _session = scheduledSession;
    const start = new Date();
    start.setHours(start.getHours() - 1)
    const end = new Date();
    end.setHours(end.getHours() + 1)
    _session.temp.startDate = start;
    _session.temp.endDate = end;
    const session = new ScheduledSession(_session);
    expect(session.isTemp()).toBe(true)
  })
  test("Should not mark session as temp", () => {
    let _session = scheduledSession;
    const start = 0
    const end = 0
    _session.temp.startDate = start;
    _session.temp.endDate = end;
    const session = new ScheduledSession(_session);
    expect(session.isTemp()).toBe(false)
  })
})

describe("Should correctly initalize session class", () => {
  test("Should init with the signage image url", () => {
    var _session = scheduledSession
    _session.signageImage = "jest-test"
    const session = new ScheduledSession(_session);
    session.initalize("false_token")
    expect(session.photo).toBe("jest-test")
    expect(session.upPhoto).toBe(undefined)
  })
  test("Should init with a call to getUPPhoto", async () => {
    var _session = scheduledSession
    _session.signageImage = ""
    const session = new ScheduledSession(_session);
    const resp = {
      data:
      {
        user: {
          name: "jest-test-author"
        },
        urls: {
          small: "jest-test-small",
          regular: "jest-test-regular"
        }
      }
    };
    mockedAxios.get.mockResolvedValue(resp);

    await session.initalize("false_token")
    expect(session.photo).toBe(null)
    expect(session.upPhoto).toStrictEqual({ url: "jest-test-regular", credits: "jest-test-author" })
  })
})

