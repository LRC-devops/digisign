import { useEffect, useState } from "react";
import { CalendarSession } from "./session.model"
import { ComponentError } from "../error/types";
import LoadingSpinner from "../LoadingSpinner";
import BGPhoto from "./BGPhoto";
import SessionProgress from "./SessionProgress";
import CardTop from "./CardTop";
import CardDetails from "./CardDetails";

type Props = {
  session: CalendarSession
}
const CalendarSessionCard = (props: Props) => {
  const [session, setSession] = useState<CalendarSession>(props.session)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ComponentError>({ hasError: false, msg: null })


  useEffect(() => {
    console.log("init session...")
    const initSession = async () => {
      try {
        setLoading(true)
        await props.session?.initalize()
        setLoading(false)
      } catch (err) {
        setLoading(true)
        const error = err as Error;
        setError({ hasError: true, msg: error.message || "An unknown error occurred fetching the session image..." })
      }
      setSession(props.session)
    }
    initSession()
  }, [])


  if (error.hasError) {
    throw new Error(error.msg || "An unknown error occurred")
  }

  // appears in the top left to notify students of potential warning like different location, cancellations, or temporary updates
  var endTime = session.date
  endTime.setTime(endTime.getTime() + (session.duration * 60000))


  return <>
    <LoadingSpinner loading={loading} />
    <BGPhoto session={session} />
    <CardTop session={session} />
    <CardDetails session={session} />
    <SessionProgress session={session} />

  </>
}
export default CalendarSessionCard
