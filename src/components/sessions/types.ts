import { UPPhoto } from "../../api/photo"
import { CalendarSession, ScheduledSession } from "./session.model"

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
  docId: string
  updatedAt?: string
  createdAt: string
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
  date: Date, // timecode
  duration: number, //minutes
  type: "calendars"
}

export type Sessions = (ScheduledSession | CalendarSession)[]
