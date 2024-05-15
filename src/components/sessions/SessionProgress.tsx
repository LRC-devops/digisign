import { useEffect, useState } from "react"
import { buildDate } from "../../utils/datetime";
import { CalendarSession, ScheduledSession } from "./session.model";

type Props = {
  session: ScheduledSession | CalendarSession
}


const getBGClass = (session: ScheduledSession | CalendarSession) => {
  var baseStr = "w-full h-6"
  if (session.isCancelled()) {
    return baseStr + " bg-cancel-900"
  }
  if (session instanceof ScheduledSession) {
    if (session?.isTemp()) {
      return baseStr + " bg-temp-900"
    }
  }
  if (session.mode === "zoom") {
    return baseStr + " bg-green-900"
  }
  return baseStr + " bg-gold-900"
}
const getFGClass = (session: ScheduledSession | CalendarSession) => {
  var baseStr = "w-full h-6"
  if (session.isCancelled()) {
    return baseStr + " bg-cancel-500"
  }
  if (session instanceof ScheduledSession) {
    if (session?.isTemp()) {
      return baseStr + " bg-temp-500"
    }
  }
  if (session.mode === "zoom") {
    return baseStr + " bg-green-500"
  }
  return baseStr + " bg-gold-500"
}

const SessionProgress = ({ session }: Props) => {
  const { start, end } = session.rawTime
  const [progress, setProgress] = useState<number>(100)
  const [pre, setPre] = useState({ isPre: false, timeUntil: 0 });
  useEffect(() => {
    const updateProgress = () => {
      var now = new Date();
      var s = buildDate(start);
      var e = buildDate(end);

      if (now < s) {
        const timeUntil = (s.getTime() - now.getTime()) / 60000
        setPre({ isPre: true, timeUntil: timeUntil })
        return setProgress(100);
      }
      var total = e.getTime() - s.getTime();
      var prog = (e.getTime() - now.getTime()) / total * 100
      setProgress(Math.floor(prog))
    }

    const interval = setInterval(() => {
      updateProgress();
    }, 60000)
    updateProgress()
    return () => {
      clearInterval(interval)
    }
  }, [])


  if (session.isCancelled()) {
    return <div className={getBGClass(session)}>
      <p className="ml-5 font-bold">Cancelled</p>
    </div >
  }

  return <div
    className={getBGClass(session)}>
    {pre.isPre && <p className="ml-5">Starts in {pre.timeUntil}{pre.timeUntil === 1 ? "min" : "mins"}</p>}
    <div style={{ transform: `translate(-${progress}%)` }} className={getFGClass(session)}>
    </div>
  </div >
}

export default SessionProgress
