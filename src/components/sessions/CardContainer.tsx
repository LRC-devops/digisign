import { ReactElement } from "react"
// import { motion } from "framer-motion"

type Props = {
  children: ReactElement
  delay: number
}
const CardContainer = ({ children, }: Props) => {
  return <div
    // initial={{ opacity: 0, y: 10 }}
    // animate={{ opacity: 1, y: 0 }}
    // transition={{ delay: 0.5 + delay }}
    className="relative flex-[1_1_30%] min-w-[32%] flex flex-col overflow-hidden rounded-md text-2xl">{children}</div>
}

export default CardContainer
