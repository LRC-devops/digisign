import { motion } from "framer-motion"
type Props = {
  duration: number
  status: "active" | "pre" | "post"
}
const Bar = (props: Props) => {

  return <div className="w-full bg-slate-400/50 h-1 rounded-xl">
    {props.status === "active" &&
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          ease: "easeInOut",
          duration: props.duration / 1200 // 1000 to convert from ms + 200 for buggy animation degration
        }}
        className="bg-slate-400 h-1 rounded-xl"></motion.div>}
    {props.status === "post" && <div className="bg-slate-400 h-1 rounded-xl w-full"></div>}

  </div>
}


export default Bar
