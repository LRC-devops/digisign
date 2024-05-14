import { UPPhoto, getUPPhoto } from "../../api/photo"
import { formatTimeString } from "../../utils/datetime"
import { IScheduledSession, ISession } from "./types"


export const isScheduledSession = (session: ISession): session is IScheduledSession => {
  console.log(session.type, "schedules")
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
