import { useEffect, useState } from "react"
import { Day, Month, formateDateString, getFullDay, getFullMonth, getTime } from "../../utils/datetime"
import { AnimatePresence, motion } from "framer-motion";


type DateTime = {
  day: Day, // use /utils/datetime/getFullDay
  date: string, // due to the suffix of the date (i.e. '1st'), this is a generic string
  month: Month,
  time: string, // due to the am/pm suffix of time, this is a generic string
}

const getDateTime = (): DateTime => {
  const now = new Date();
  const dateTime = {
    day: getFullDay(now.getDay()),
    date: formateDateString(now.getDate()),
    month: getFullMonth(now.getMonth()),
    time: getTime(now)
  }

  return dateTime;
}

const DateTime = () => {
  const [dateTime, setDateTime] = useState<DateTime>(getDateTime())

  useEffect(() => {
    // update time every 30 seconds
    setInterval(() => {
      setDateTime(getDateTime())
    }, 30000)
  }, [])

  return (
    <AnimatePresence>
      <div className="flex flex-col h-full text-[3vw] min-w-[15vw] align-middle justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="font-extralight  text-[61%] mr-auto">{dateTime.day}</motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="font-black ml-auto mr-auto leading-5">{`${dateTime.month} ${dateTime.date}`}</motion.h2>
        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="font-extralight ml-auto text-[61%] mb-0">{dateTime.time}</motion.h2>
      </div>
    </AnimatePresence>
  )
}

export default DateTime;
