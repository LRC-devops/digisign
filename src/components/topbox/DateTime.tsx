import { useEffect, useState } from "react"
import { Day, Month, formateDateString, getFullDay, getFullMonth, getTime } from "../../utils/datetime"


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
    <div className="flex flex-col h-full text-[3vw] align-middle justify-between">
      <h2 className="font-extralight  text-[61%] mb-3 mr-auto">{dateTime.day}</h2>
      <h2 className="font-black ml-auto mr-auto leading-10">{`${dateTime.month} ${dateTime.date}`}</h2>
      <h2 className="font-extralight ml-auto text-[61%] mt-2 mb-0">{dateTime.time}</h2>
    </div>
  )
}

export default DateTime;
