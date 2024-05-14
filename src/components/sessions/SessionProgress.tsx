import { useEffect, useState } from "react"
import { getTimeObject } from "../../utils/datetime";
import { motion } from "framer-motion"
import { ScheduledSession } from "./session.model";

type Props = {
  session: ScheduledSession
}

const buildDate = (time: string): Date => {
  let date = new Date();
  var { hours, minutes } = getTimeObject(time);
  date.setHours(+hours)
  date.setMinutes(+minutes)
  return date;
}

const getBGClass = (session: ScheduledSession) => {
  var baseStr = "w-full h-6"
  if (session.isCancelled()) {
    return baseStr + " bg-cancel-900"
  }
  if (session.isTemp()) {
    return baseStr + " bg-temp-900"
  }
  if (session.mode === "zoom") {
    return baseStr + " bg-green-900"
  }
  return baseStr + " bg-gold-900"
}
const getFGClass = (session: ScheduledSession) => {
  var baseStr = "w-full h-6"
  if (session.isCancelled()) {
    return baseStr + " bg-cancel-500"
  }
  if (session.isTemp()) {
    return baseStr + " bg-temp-500"
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
        console.log((s.getTime() - now.getTime()) / 1000 / 60)

        setPre({ isPre: true, timeUntil: (s.getTime() - now.getTime()) / 1000 / 60 })

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

  return <div className={getBGClass(session)}>
    {pre.isPre && <p className="ml-5">Session starts in {pre.timeUntil}mins</p>}
    <motion.div key={progress} style={{ transform: `translate(-${progress}%)` }} className={getFGClass(session)}>
    </motion.div>
  </div >
}

export default SessionProgress
