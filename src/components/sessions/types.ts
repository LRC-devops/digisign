import { UPPhoto } from "../../api/photo"

export interface ISession {
  subject: string,
  signageImage: string,
  upPhoto?: UPPhoto,
  type: "schedules" | "calendars"
  mode: "in-person" | "zoom",
  service: string,
  host: string,
  location?: {
    building: string,
    room: string,
  } | null,
  initCancel: Date,
  revertCancel: Date,
}

export interface IScheduledSession extends ISession {
  startTime: string,
  endTime: string,
  course: string[] | string,
  temp: {
    startDate: Date,
    endDate: Date
  }
  type: "schedules"
  singleDay: boolean
}

export interface ICalendarSession extends ISession {
  startTime: string,
  endTime: string,
  course: string[] | string,
  temp: {
    startDate: Date,
    endDate: Date
  }
  type: "calendars"
}
