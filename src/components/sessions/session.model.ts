import { UPPhoto, getUPPhoto } from "../../api/photo"
import { build24Time, formatTimeString, localeTimeString } from "../../utils/datetime"
import { ICalendarSession, IScheduledSession, ISession } from "./types"


export const isScheduledSession = (session: ISession): session is IScheduledSession => {
  return session.type === "schedules"
}

export abstract class Session<T extends ISession> {
  subject: string
  host: string
  location?: {
    building: string,
    room: string
  } | null
  type: "schedules" | "calendars"
  photo: string | null
  upPhoto?: UPPhoto
  mode: string
  service: string


  constructor(session: T) {
    this.subject = session.subject
    this.host = session.host
    this.location = session.location || null;
    this.type = session.type
    this.photo = session.signageImage || null;
    this.mode = session.mode
    this.service = session.service
  }

  async initalize(): Promise<void> {
    if (this.photo) {
      return;
    }
    const res = await getUPPhoto(this.subject);
    if (res instanceof Error) {
      throw res;
    }
    this.upPhoto = res;
  }
  hasLocation(): boolean {
    return !!this.location?.building // building is the only required field should a location be required
  }
}

export class CalendarSession extends Session<ICalendarSession> {
  date: Date
  duration: number
  cancel: {
    init: Date
  }
  rawTime: {
    start: string
    end: string
  }
  startTime: string
  endTime: string

  constructor(session: ICalendarSession) {
    super(session)
    this.date = new Date(session.date)
    this.duration = session.duration;
    this.cancel = {
      init: new Date(session.initCancel)
    }
    this.rawTime = this.getRawTime()
    var { start, end } = this.getFriendlyTimes()
    this.startTime = start;
    this.endTime = end

  }
  private getRawTime(): typeof this.rawTime {
    var end = new Date(this.date.getTime());
    var msDur = this.duration * 60000
    end.setTime(end.getTime() + msDur)
    return {
      start: build24Time(this.date),
      end: build24Time(end)
    }
  }
  private getFriendlyTimes(): typeof this.rawTime {
    var end = new Date(this.date.getTime());
    var msDur = this.duration * 60000
    end.setTime(end.getTime() + msDur)
    return {
      start: localeTimeString(this.date),
      end: localeTimeString(end)
    }
  }
  isCancelled(): boolean {
    var now = new Date();
    return now.toLocaleDateString() === this.cancel.init.toLocaleDateString()
  }
}

export class ScheduledSession extends Session<IScheduledSession> {
  startTime: string
  endTime: string
  rawTime: {
    start: string
    end: string
  }
  course: string[]
  temp: {
    startDate: Date,
    endDate: Date,
  }
  cancel: {
    init: Date,
    revert: Date,
    singleDay: boolean
  }

  constructor(session: IScheduledSession) {
    super(session);
    session = session as IScheduledSession;
    this.startTime = formatTimeString(session.startTime)
    this.endTime = formatTimeString(session.endTime)
    this.rawTime = {
      start: session.startTime,
      end: session.endTime
    }
    // this.temp = session.temp
    this.temp = {
      ...session.temp,
      startDate: new Date(session.temp.startDate),
      endDate: new Date(session.temp.endDate),
    };
    this.course = Array.isArray(session.course) ? session.course : [session.course]
    this.cancel = {
      init: new Date(session.initCancel),
      revert: new Date(session.revertCancel),
      singleDay: session.singleDay || false
    }
  }

  isCancelled(): boolean {
    var now = new Date();

    if (this.cancel.singleDay) {
      return now.toLocaleDateString() === this.cancel.init.toLocaleDateString()
    }
    return this.cancel.init <= now && now <= this.cancel.revert || this.cancel.init.toLocaleDateString() === now.toLocaleDateString() || this.cancel.revert.toLocaleDateString() === now.toLocaleDateString()
  }
  isTemp(): boolean {
    var now = new Date();
    return this.temp.startDate <= now && now <= this.temp.endDate || this.temp.startDate.toLocaleDateString() === now.toLocaleDateString() || this.temp.endDate.toLocaleDateString() === now.toLocaleDateString()
  }

}
