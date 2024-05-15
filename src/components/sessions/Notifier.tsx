import { CalendarSession, ScheduledSession } from "./session.model"

type Severity = "error" | "warn" | "neutral" | "success"
type Props = {
  session: ScheduledSession | CalendarSession
}

const buildClass = (severity: Severity): string => {
  var baseStr = "p-1 ml-2 mt-2 font-bold rounded-s flex items-center "
  switch (severity) {
    case "error":
      return baseStr + "bg-cancel-500"
    case "warn":
      return baseStr + "bg-temp-500 text-black"
    case "neutral":
      return baseStr + "bg-sky-500 text-black"
    case "success":
      return baseStr + "bg-green-500 text-black"
    default:
      return baseStr
  }
}

type TNotifier = {
  severity: Severity,
  message: string
}

const buildNotifier = (session: ScheduledSession | CalendarSession): null | TNotifier => {
  let notifier: null | TNotifier = null;
  if (session.isCancelled()) {
    notifier = {
      severity: "error",
      message: "Cancelled"
    }
  } else if (session instanceof ScheduledSession) {
    if (session.isTemp()) {
      notifier = {
        severity: "warn",
        message: "Temporary Changes"
      }
    }
  } else if (session.hasLocation()) {
    notifier = {
      severity: "warn",
      message: `${session.location?.building} ${session?.location?.room && " - " + session.location?.room}`
    }
  }
  return notifier
}

const Notifier = ({ session }: Props) => {

  const notifier = buildNotifier(session);
  if (!notifier) {
    return <></>
  }
  return <div className={buildClass(notifier?.severity)}>{notifier.message}</div>
}

export default Notifier
