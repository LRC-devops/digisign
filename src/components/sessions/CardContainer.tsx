import { ReactElement } from "react"
import { motion } from "framer-motion"

type Props = {
  children: ReactElement
}
const CardContainer = ({ children }: Props) => {
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative flex-[1_1_30%] min-w-[32%] flex flex-col overflow-hidden rounded-md">{children}</motion.div>
}

export default CardContainer
