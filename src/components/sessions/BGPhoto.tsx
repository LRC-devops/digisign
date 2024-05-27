import { CalendarSession, ScheduledSession } from "./session.model"
import { motion } from "framer-motion"

type Props = {
  session: ScheduledSession | CalendarSession
}
const BGPhoto = ({ session }: Props) => {

  var uri = session.photo || session.upPhoto?.url || "/card-fallback.jpg"
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    exit={{ opacity: 0 }}
    className="absolute top-0 left-0 right-0 bottom-0 bg-gold-500 z-[-1]">
    <img className="w-full h-full object-cover" src={uri} />
  </motion.div>

}

export default BGPhoto
