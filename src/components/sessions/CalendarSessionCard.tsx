import { CalendarSession } from "./session.model"
import BGPhoto from "./BGPhoto";
import SessionProgress from "./SessionProgress";
import CardTop from "./CardTop";
import CardDetails from "./CardDetails";

type Props = {
  session: CalendarSession
}
const CalendarSessionCard = (props: Props) => {
  const { session } = props
  if (!session) {
    return <h2 className="text-cancel-500">An error occurred. Please reload the page.</h2>
  }
  var endTime = new Date(session.date)
  endTime.setTime(endTime.getTime() + (session.duration * 60000))

  return <>
    <BGPhoto session={session} />
    <CardTop session={session} />
    <CardDetails session={session} />
    <SessionProgress session={session} />

  </>
}
export default CalendarSessionCard
