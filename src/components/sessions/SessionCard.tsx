import { ICalendarSession, ISession } from "./types"
import { CalendarSession, ScheduledSession, isScheduledSession } from './session.model'
import ScheduledSessionCard from "./ScheduledSessionCard"
import CalendarSessionCard from "./CalendarSessionCard"
import CardContainer from "./CardContainer"

type Props = {
  session: ISession
}
const SessionCard = (props: Props) => {


  return <CardContainer>
    {isScheduledSession(props.session) ? <ScheduledSessionCard session={new ScheduledSession(props.session)} /> : <CalendarSessionCard session={new CalendarSession(props.session as ICalendarSession)} />}
  </CardContainer>
}

export default SessionCard
