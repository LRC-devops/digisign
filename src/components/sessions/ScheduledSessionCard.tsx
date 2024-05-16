import { ScheduledSession } from "./session.model"
import BGPhoto from "./BGPhoto";
import SessionProgress from "./SessionProgress";
import CardTop from "./CardTop";
import CardDetails from "./CardDetails";

type Props = {
  session: ScheduledSession,
  delay: number
}
const ScheduledSessionCard = ({ session, delay }: Props) => {
  // appears in the top left to notify students of potential warning like different location, cancellations, or temporary updates

  return <>
    <BGPhoto session={session} />
    <CardTop session={session} />
    <CardDetails session={session} />
    <SessionProgress delay={delay} session={session} />

  </>
}
export default ScheduledSessionCard
