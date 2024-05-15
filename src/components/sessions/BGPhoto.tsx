import { CalendarSession, ScheduledSession } from "./session.model"

type Props = {
  session: ScheduledSession | CalendarSession
}
const BGPhoto = ({ session }: Props) => {

  var uri = session.photo || session.upPhoto?.url || "/card-fallback.jpg"
  return <div className="absolute top-0 left-0 right-0 bottom-0 bg-red-500 z-[-1]">
    <img className="w-full h-full object-cover" src={uri} />
  </div>

}

export default BGPhoto
