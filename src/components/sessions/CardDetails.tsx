import { FaBuilding, FaClock, FaFolder, FaRocket, FaTools, FaUser, FaUsers } from "react-icons/fa"
import BottomGradient from "./BottomGradient"
import { CalendarSession, ScheduledSession } from "./session.model"
import { ReactElement } from "react"
import { FaComputer } from "react-icons/fa6"
import { IoSchool } from "react-icons/io5"
import { convDashedStrsToCapCase } from "../../utils/strings"

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

enum Service {
  PeerTutoring = "peer-tutoring",
  SSW = "study-skills-workshops",
  Boost = "boost",
  SupplementalLearning = "supplemental-learning"
}
const serviceIcons = {
  [Service.PeerTutoring]: <FaUsers />,
  [Service.SSW]: <FaTools />,
  [Service.Boost]: <FaRocket />,
  [Service.SupplementalLearning]: <IoSchool />,
  default: <FaFolder />
}

interface IService {
  icon: ReactElement,
  name: string,
  friendlyName: string
}
const Box = ({ children, addClasses }: BoxProps) => {

  return <div
    className={`flex gap-1 items-center ${addClasses}`}>{children}</div>
}
const CardDetails = ({ session }: Props) => {
  const service: IService = {
    name: session.service,
    friendlyName: convDashedStrsToCapCase(session.service),
    icon: <></>
  }
  switch (service.name) {
    case Service.PeerTutoring:
      service.icon = serviceIcons[Service.PeerTutoring]
      break;
    case Service.SSW:
      service.icon = serviceIcons[Service.SSW]
      break;
    case Service.Boost:
      service.icon = serviceIcons[Service.Boost]
      break;
    case Service.SupplementalLearning:
      service.icon = serviceIcons[Service.SupplementalLearning]
      break;
    default:
      service.icon = serviceIcons.default
      break;
  }
  return <BottomGradient>
    <>
      <CardStatus session={session} />
      <Box idx={0} addClasses="text-3xl font-light mb-0">
        <>
          {/* <FaFolderOpen /> */}
          <p className="leading-none">{session.subject}</p>
        </>
      </Box>
      {session instanceof ScheduledSession &&
        <Box idx={1} addClasses="text-xl mb-2">
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
              {service.icon}
              <p>{service.friendlyName}</p>
            </>
          </Box>
          {/* <Box addClasses=""> */}
          {/*   <> */}
          {/*     {session.mode === "in-person" ? <FaBuilding /> : session.mode === "zoom" ? <FaComputer /> : ""} */}
          {/*     <p>{session.mode}</p> */}
          {/*   </> */}
          {/* </Box> */}
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
