import { getAnnouncements, getConfig } from "../api/maxanns";
import { getSessions } from "../api/sessions";
import { Config, MaxAnn as IMaxAnn } from "../components/MaxAnns/types";
import { CalendarSession, ScheduledSession, isScheduledSession } from "../components/sessions/session.model";
import { ICalendarSession, ISession, Sessions } from "../components/sessions/types";
import { sectionAnnouncements } from "./announcements";
import { isDiffV2 } from "./stateDiff";

const initalizeSessionClasses = async (sessions: ISession[]): Promise<Sessions> => {
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
// type SetError = (error: ComponentError) => void
// type FetchSessionsProps = {
//   setSessions: (sessions: Sessions) => void
//   setError: SetError
//   sessions: Sessions
// }
export const fetchSessions = async (sessions: Sessions): Promise<Sessions | Error | null> => {
  console.log("getting session data")
  try {
    // if there are sessions displayed no need to show loading spinner
    const res = await getSessions();
    if (res instanceof Error) {
      throw res;
    }
    if (isDiffV2(sessions, res)) {
      let _sessions = await initalizeSessionClasses(res);
      return _sessions
    }
    return null;
    // call session.initalize
  } catch (err) {
    const error = err as Error;
    return error;
  }
}

// type FetchConfigProps = {
//   setConfig: (config: Config) => void
//   setError: SetError
// }
export const fetchConfig = async (): Promise<Config | Error> => {
  console.log("getting config data")
  try {
    const res = await getConfig()
    if (res instanceof Error) {
      throw res;
    }
    const config: Config = {
      ...res,
      totalPages: Math.ceil(res.count / 3),
      currentPage: 0
    }
    return config

  } catch (err) {
    const error = err as Error;
    // setError({ hasError: true, msg: error.message || "An unknown error occurred" })
    return error;
  }
}


export const fetchAnnouncements = async (): Promise<{ runtimes: number[], announcements: IMaxAnn[][], rawAnnouncements: IMaxAnn[] } | Error> => {
  try {
    const res = await getAnnouncements();
    if (res instanceof Error) {
      throw res;
    }
    for (let a of res) {
      var img = new Image();
      img.src = a.imageUrl;
      img.crossOrigin = "anonymous"
      a.image = img
    }
    const sectionedAnnouncements = sectionAnnouncements(res);
    const runtimes = sectionedAnnouncements.anns.map((a: IMaxAnn[]) => {
      var pageDuration = a.reduce((acc: number, a: IMaxAnn) => acc + a.duration, 0)
      return pageDuration
    })
    return { runtimes, announcements: sectionedAnnouncements.anns, rawAnnouncements: res }
  } catch (err) {
    const error = err as Error;
    console.error("maximized announcement error:", err)
    return error;
  }
}
