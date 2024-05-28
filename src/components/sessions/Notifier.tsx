import { CalendarSession, ScheduledSession } from "./session.model"
import { motion } from "framer-motion"

enum Severity {
  Error = "error",
  Warn = "warn",
  Neutral = "neutral",
  Success = "success"
}
// type Severity = "error" | "warn" | "neutral" | "success"
type Props = {
  session: ScheduledSession | CalendarSession
}

const buildClass = (severity: Severity): string => {
  var baseStr = "p-1 ml-2 mt-2 font-bold rounded-s "
  switch (severity) {
    case Severity.Error:
      return baseStr + "bg-cancel-500"
    case Severity.Warn:
      return baseStr + "bg-temp-500 text-black"
    case Severity.Neutral:
      return baseStr + "bg-sky-500 text-black"
    case Severity.Success:
      return baseStr + "bg-green-500 text-black"
    default:
      return baseStr
  }
}

type TNotifier = {
  severity: Severity,
  message: string
}

enum Reason {
  Cancelled = "cancelled",
  Temp = "temp",
  Location = "location",
  None = "none"
}

const buildNotifier = (session: ScheduledSession | CalendarSession): TNotifier[] => {
  var out: TNotifier[] = []
  const reason: Reason = session.isCancelled() ? Reason.Cancelled : session instanceof ScheduledSession && session.isTemp() ? Reason.Temp : session.hasLocation() ? Reason.Location : Reason.None
  switch (reason) {
    // If cancelled can return early as no other info is important
    case Reason.None:
      break;
    case Reason.Cancelled:
      out.push({
        severity: Severity.Error,
        message: "Cancelled"
      })
      break;
    //@ts-ignore
    // ts is complaining about a fallthrough casse, but that is exactly what I want
    case Reason.Temp:
      out.push({
        severity: Severity.Warn,
        message: "Temporary Changes"
      })
    case Reason.Location:
      out.push({
        severity: Severity.Warn,
        message: `${session.location?.building} ${session?.location?.room && " - " + session.location?.room}`
      })
  }
  return out;
}

const Notifier = ({ session }: Props) => {

  const notifier = buildNotifier(session);
  if (!notifier) {
    return <></>
  }
  return <div className="flex flex-col items-start">
    {notifier.map((n, idx) => (
      <motion.div
        key={idx}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className={buildClass(n?.severity)}>
        <p>{n.message}</p></motion.div>
    ))}
  </div>
}

export default Notifier
