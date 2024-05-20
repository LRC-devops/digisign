import { AnimatePresence, motion } from "framer-motion"
import BottomGradient from "./sessions/BottomGradient"

type Props = {
  duration: number,
  heading: string,
  body: string
  isError: boolean
  open: boolean
}
const SnackBar = (props: Props) => {
  const { heading, body, isError } = props

  return <AnimatePresence>
    {props.open &&
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ ease: "easeInOut", duration: 3 }}
        className="absolute bottom-0 right-0 left-0"
      >

        <BottomGradient>
          <div className="pb-10 pt-10 pl-5 pr-5">
            <h2 className={`${isError && "text-cancel-200"} text-4xl pb-3`}>{heading}</h2>
            <p className="">{body}</p>
          </div>
        </BottomGradient>
      </motion.div>
    }
  </AnimatePresence>

}

export default SnackBar;
