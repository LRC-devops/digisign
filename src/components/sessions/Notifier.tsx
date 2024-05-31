import { ReactElement } from "react"
import { CalendarSession, ScheduledSession } from "./session.model"
import { motion } from "framer-motion"
import { MdCancel, MdLocationOn, MdNotificationsActive } from "react-icons/md"

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
  var baseStr = "p-1 ml-2 mt-2 font-bold rounded-md flex items-center gap-1 overflow-hidden "
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
  icon: ReactElement
}

enum Reason {
  Cancelled = "cancelled",
  Temp = "temp",
  Location = "location",
  TempAndLocation = "temp && location",
  None = "none"
}
var iconClass = "text-2xl"

const buildNotifier = (session: ScheduledSession | CalendarSession): TNotifier[] => {
  var out: TNotifier[] = []
  let reason: Reason;

  if (session.isCancelled()) reason = Reason.Cancelled
  else if (session instanceof ScheduledSession && session.isTemp() && session.hasLocation()) reason = Reason.TempAndLocation
  else if (session instanceof ScheduledSession && session.isTemp()) reason = Reason.Temp
  else if (session.hasLocation()) reason = Reason.Location
  else reason = Reason.None

  switch (reason) {
    // If cancelled can return early as no other info is important
    case Reason.None:
      break;
    case Reason.Cancelled:
      out.push({
        severity: Severity.Error,
        message: "Cancelled",
        icon: <MdCancel className={iconClass} />
      })
      break;
    case Reason.Temp:
      out.push({
        severity: Severity.Warn,
        message: "Temporary Changes",
        icon: <MdNotificationsActive className={iconClass} />
      })
      break;
    case Reason.Location:
      out.push({
        severity: Severity.Warn,
        message: `${session.location?.building} ${session?.location?.room && " - " + session.location?.room}`,
        icon: <MdLocationOn className={iconClass} />
      })
      break;
    case Reason.TempAndLocation:
      out.push({
        severity: Severity.Warn,
        message: `${session.location?.building} ${session?.location?.room && " - " + session.location?.room}`,
        icon: <MdLocationOn className={iconClass} />
      })
      out.push({
        severity: Severity.Warn,
        message: "Temporary Changes",
        icon: <MdNotificationsActive className={iconClass} />
      })
      break;
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
        {n.icon}
        <p>{n.message}</p></motion.div>
    ))}
  </div>
}

export default Notifier
