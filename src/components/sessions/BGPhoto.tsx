import Credits from "./Credits"
import { ScheduledSession } from "./session.model"

type Props = {
  session: ScheduledSession
}
const BGPhoto = ({ session }: Props) => {
  return <>
    <img className="absolute top-[5] left-[5] right-[5] bottom-[5] scale-115 z-[-1]" src={session.photo || session.upPhoto?.url} />
    {session.upPhoto && <Credits credit={session.upPhoto.credits} />}
  </>

}

export default BGPhoto
