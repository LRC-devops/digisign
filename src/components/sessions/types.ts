import { UPPhoto } from "../../api/photo"
import { CalendarSession, ScheduledSession } from "./session.model"

export interface ISession {
  subject: string,
  signageImage?: string,
  upPhoto?: UPPhoto,
  type: "schedules" | "calendars"
  mode: "in-person" | "zoom",
  service: string,
  host: string,
  location?: {
    building: string,
    room: string,
  } | null,
  initCancel: Date | number,
  revertCancel: Date | number,
  docId: string
  updatedAt?: number | Date
  createdAt: number | Date
}

export interface IScheduledSession extends ISession {
  startTime: string,
  endTime: string,
  course: string[] | string,
  temp: {
    startDate: Date | number,
    endDate: Date | number
  }
  type: "schedules"
  singleDay: boolean
  startDate: Date | number,
  endDate: Date | number
  day: string
}

export interface ICalendarSession extends ISession {
  date: Date | number, // timecode
  duration: number, //minutes
  type: "calendars"
  isCancelled?: boolean
}

export type Sessions = (ScheduledSession | CalendarSession)[]
