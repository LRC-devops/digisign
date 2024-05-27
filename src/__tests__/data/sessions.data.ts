import { ICalendarSession, IScheduledSession } from "../../components/sessions/types"

export const scheduledSession: IScheduledSession = {
  "endDate": 1716854400000,
  "signageImage": "",
  "type": "schedules",
  "service": "test",
  "host": "Caleb",
  "location": {
    "building": "",
    "room": ""
  },
  "startDate": 1705363200000,
  "createdAt": 1715725191511,
  "mode": "in-person",
  "temp": {
    "endDate": 1715666400000,
    "startDate": 1715666400000
  },
  "singleDay": true,
  "initCancel": 0,
  "revertCancel": 0,
  "course": [
    "Starting soon",
    "some more stuff",
    "another course",
    "yet more",
    "more",
    "long course name like this should make it overflow"
  ],
  "subject": "Coming Soon!",
  "startTime": "10:05",
  "endTime": "19:18",
  "day": "M",
  "updatedAt": 1716821747020,
  "docId": "aeb770c0-9cba-4c91-91ae-0cc0b037a02c",
}
export const calendarSession: ICalendarSession = {
  "type": "calendars",
  "mode": "in-person",
  "service": "test",
  "host": "Caleb",
  "location": {
    "building": "",
    "room": ""
  },
  "createdAt": 1715796716395,
  "subject": "Ace Your Tests!!!!!",
  "duration": 195,
  "date": 1716822000000,
  "updatedAt": 1716821815894,
  "docId": "9e206690-52f1-4179-bf48-c98c8402dbd3",
  "initCancel": 0,
  "revertCancel": 0
}
const sessionData: (ICalendarSession | IScheduledSession)[] = [calendarSession, scheduledSession]
export default sessionData
