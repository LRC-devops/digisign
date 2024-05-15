import { CalendarSession, ScheduledSession } from './session.model'
import ScheduledSessionCard from "./ScheduledSessionCard"
import CalendarSessionCard from "./CalendarSessionCard"
import CardContainer from "./CardContainer"

type Props = {
  session: (ScheduledSession | CalendarSession)
}
const SessionCard = (props: Props) => {


  return <CardContainer>
    {props.session instanceof ScheduledSession ? <ScheduledSessionCard key={props.session.id} session={props.session} /> : <CalendarSessionCard key={props.session.id} session={props.session} />}
  </CardContainer>
}

export default SessionCard
