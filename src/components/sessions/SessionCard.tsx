import { ISession } from "./types"
import { ScheduledSession, isScheduledSession } from './session.model'
import ScheduledSessionCard from "./ScheduledSessionCard"

type Props = {
  session: ISession
}
const SessionCard = (props: Props) => {
  console.log(props.session.type)

  if (isScheduledSession(props.session)) {
    return <ScheduledSessionCard session={new ScheduledSession(props.session)} />
  }
  console.log("early return")
  return <></>
}

export default SessionCard
