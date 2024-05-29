import { getAnnouncements, getConfig } from "../api/maxanns";
import { getSessions } from "../api/sessions";
import { Config, MaxAnn as IMaxAnn } from "../components/MaxAnns/types";
import { CalendarSession, ScheduledSession, isScheduledSession } from "../components/sessions/session.model";
import { ICalendarSession, ISession, Sessions } from "../components/sessions/types";
import { sectionAnnouncements } from "./announcements";
import { isDiffV2 } from "./stateDiff";

const initalizeSessionClasses = async (sessions: ISession[], token: string): Promise<Sessions> => {
  let out = [];
  for (let s of sessions) {
    let session = null;
    if (isScheduledSession(s)) {
      session = new ScheduledSession(s);
    } else {
      session = new CalendarSession(s as ICalendarSession)
    }
    await session.initalize(token);
    out.push(session);
  }
  return out;
}
export const fetchSessions = async (sessions: Sessions, token: string): Promise<Sessions | Error | null> => {
  try {
    // if there are sessions displayed no need to show loading spinner
    const res = await getSessions(token);
    if (res instanceof Error) {
      throw res;
    }
    console.log("[fetchSessions]: res: ", res)
    if (isDiffV2(sessions, res)) {
      let _sessions = await initalizeSessionClasses(res, token);
      console.log(`[app.utils]: fetchSessions: returned: `, _sessions)
      return _sessions
    }
    console.log(`[app.utils]: fetchSessions: returned null`,)
    return null;
    // call session.initalize
  } catch (err) {
    const error = err as Error;
    return error;
  }
}

export const fetchConfig = async (token: string): Promise<Config | Error> => {
  try {
    const res = await getConfig(token)
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
    return error;
  }
}


export const fetchAnnouncements = async (token: string): Promise<{ runtimes: number[], announcements: IMaxAnn[][], rawAnnouncements: IMaxAnn[] } | Error> => {
  try {
    const res = await getAnnouncements(token);
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
