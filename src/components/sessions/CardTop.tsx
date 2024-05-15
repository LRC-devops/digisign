import { CalendarSession, ScheduledSession } from "./session.model";
import Credits from "./Credits";
import Notifier from "./Notifier";

type Props = {
  session: CalendarSession | ScheduledSession,
}
const CardTop = ({ session }: Props) => {

  return <div className="flex justify-between w-full">
    <Notifier session={session} />
    {session.upPhoto?.credits && <Credits credit={session.upPhoto.credits} />}
  </div>
}

export default CardTop;
