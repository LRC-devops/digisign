import { FaBuilding, FaClock, FaFolder, FaUser, FaFolderOpen, FaNewspaper } from "react-icons/fa"
import BottomGradient from "./BottomGradient"
import { CalendarSession, ScheduledSession } from "./session.model"
import { ReactElement } from "react"
import { FaComputer } from "react-icons/fa6"

type Props = {
  session: ScheduledSession | CalendarSession
}
type BoxProps = {
  children: ReactElement
  addClasses?: string
}
const Box = ({ children, addClasses }: BoxProps) => {
  return <div className={`flex gap-1 items-center ${addClasses}`}>{children}</div>
}
const CardDetails = ({ session }: Props) => {
  return <BottomGradient>
    <>
      <Box addClasses="text-white/75">
        <>
          <FaClock />
          <p>{session.startTime} - {session.endTime}</p>
        </>
      </Box>
      <div className="flex gap-3 items-center text-white/75">
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
      </div>
      <Box>
        <>
          <FaFolderOpen />
          <p className="font-bold">{session.subject}</p>
        </>
      </Box>
      {session instanceof ScheduledSession &&
        <Box>
          <>
            <FaNewspaper />
            <p className="font-bold">{session.course.join(", ")}</p>
          </>
        </Box>
      }
    </>
  </BottomGradient>

}

export default CardDetails
