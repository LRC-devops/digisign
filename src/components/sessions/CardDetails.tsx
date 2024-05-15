import { FaBuilding, FaClock, FaFolder, FaUser, FaFolderOpen, FaNewspaper } from "react-icons/fa"
import BottomGradient from "./BottomGradient"
import { CalendarSession, ScheduledSession } from "./session.model"
import { ReactElement } from "react"
import { FaComputer } from "react-icons/fa6"
import { motion } from "framer-motion"

type Props = {
  session: ScheduledSession | CalendarSession
}
type BoxProps = {
  children: ReactElement
  addClasses?: string
  idx?: number
}
const Box = ({ children, addClasses, idx }: BoxProps) => {
  var offset = idx ? ((idx + 1) / 10) + 0.6 : 0.6

  return <motion.div
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: offset, duration: 0.3 }}
    className={`flex gap-1 items-center ${addClasses}`}>{children}</motion.div>
}
const CardDetails = ({ session }: Props) => {
  return <BottomGradient>
    <>
      <Box idx={0} addClasses="text-white/75">
        <>
          <FaClock />
          <p>{session.startTime} - {session.endTime}</p>
        </>
      </Box>
      <Box idx={1} addClasses="flex gap-3 items-center text-white/75">
        <>
          <Box>
            <>
              <FaFolder />
              <p>{session.service}</p>
            </>
          </Box>
          <Box>
            <>
              {session.mode === "in-person" ? <FaBuilding /> : session.mode === "zoom" ? <FaComputer /> : ""}
              <p>{session.mode}</p>
            </>
          </Box>
          <Box>
            <>
              <FaUser />
              <p>{session.host}</p>
            </>
          </Box>
        </>
      </Box>
      <Box idx={2}>
        <>
          <FaFolderOpen />
          <p className="font-bold">{session.subject}</p>
        </>
      </Box>
      {session instanceof ScheduledSession &&
        <Box idx={3}>
          <>
            <FaNewspaper className="" />
            <p className="overflow-hidden truncate max-w-[90%]">{session.course.join(", ")}</p>
          </>
        </Box>
      }
    </>
  </BottomGradient>

}

export default CardDetails
