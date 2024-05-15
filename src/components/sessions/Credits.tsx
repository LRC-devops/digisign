import { motion } from "framer-motion"
type Props = {
  credit: string
}
const Credits = ({ credit }: Props) => {
  return <motion.div
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.3 }}
    className="bg-slate-900/50 p-1  mr-2 mt-2 ml-auto rounded-s">
    <p className="">Photo by: {credit}</p>
  </motion.div>
}

export default Credits
