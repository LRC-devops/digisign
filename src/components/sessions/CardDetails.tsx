import { FaBuilding, FaClock, FaFolder, FaUser } from "react-icons/fa"
import BottomGradient from "./BottomGradient"
import { CalendarSession, ScheduledSession } from "./session.model"
import { ReactElement } from "react"
import { FaComputer } from "react-icons/fa6"
import { motion } from "framer-motion"

type StatusProps = {
  session: ScheduledSession | CalendarSession
}

const CardStatus = ({ session }: StatusProps) => {
  var baseClass = "w-10 h-1 rounded-lg mb-3 "
  let statusClass = baseClass;
  if (session.isCancelled()) {
    statusClass += "bg-cancel-500"
  } else if (session instanceof ScheduledSession && session.isTemp()) {
    statusClass += "bg-temp-500"
  } else if (session.mode === "zoom") {
    statusClass += "bg-green-500"
  } else {
    statusClass += "bg-gold-500"
  }

  return <div className={statusClass}></div>
}
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
      <CardStatus session={session} />
      <Box idx={0} addClasses="text-3xl font-light ">
        <>
          {/* <FaFolderOpen /> */}
          <p className="">{session.subject}</p>
        </>
      </Box>
      {session instanceof ScheduledSession &&
        <Box idx={1} addClasses="text-xl mb-3">
          <>
            {/* <FaNewspaper className="" /> */}
            <p className="overflow-hidden truncate font-bold"><span className="font-normal text-white/60">Courses:</span> {session.course.join(", ")}</p>
          </>
        </Box>
      }
      <Box idx={2} addClasses="text-white/75">
        <>
          <FaClock />
          <p>{session.startTime} - {session.endTime}</p>
        </>
      </Box>
      <Box idx={3} addClasses="flex gap-3 items-center text-white/75 mt-2">
        <>
          <Box addClasses="">

            <>
              <FaFolder />
              <p>{session.service}</p>
            </>
          </Box>
          <Box addClasses="">
            <>
              {session.mode === "in-person" ? <FaBuilding /> : session.mode === "zoom" ? <FaComputer /> : ""}
              <p>{session.mode}</p>
            </>
          </Box>
          <Box addClasses="">
            <>
              <FaUser />
              <p>{session.host}</p>
            </>
          </Box>
        </>
      </Box>
    </>
  </BottomGradient>

}


export default CardDetails
