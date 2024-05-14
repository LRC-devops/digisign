import { useEffect, useState } from "react";
import { ScheduledSession } from "./session.model"
import { ComponentError } from "../error/types";
import LoadingSpinner from "../LoadingSpinner";
import BGPhoto from "./BGPhoto";
import BottomGradient from "./BottomGradient";
import SessionProgress from "./SessionProgress";

type Props = {
  session: ScheduledSession
}
const ScheduledSessionCard = (props: Props) => {
  const [session, setSession] = useState<ScheduledSession>(props.session)
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

  console.log("session: ", session)

  if (error.hasError) {
    throw new Error(error.msg || "An unknown error occurred")
  }

  return <div className={`relative h-[50%] w-[30%] flex flex-col overflow-hidden rounded-md`}>
    <LoadingSpinner loading={loading} />
    <BGPhoto session={session} />
    <BottomGradient>
      <>
        <p>{session.startTime} - {session.endTime}</p>
        <p>{session.service} - {session.mode} - {session.host}</p>
        <p>{session.subject}</p>
        <p>{session.course.join(", ")}</p>
      </>
    </BottomGradient>
    <SessionProgress session={session} />

  </div>
}
export default ScheduledSessionCard
