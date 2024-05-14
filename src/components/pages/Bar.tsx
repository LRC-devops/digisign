import { motion } from "framer-motion"
type Props = {
  duration: number
  status: "active" | "pre" | "post"
}
const Bar = (props: Props) => {
  console.log(props)

  return <div className="w-full bg-slate-400/50 h-1 rounded-xl">
    {props.status === "active" && <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ ease: "easeInOut", duration: props.duration / 1000 }} className="bg-slate-400 h-1 rounded-xl"></motion.div>}
    {props.status === "post" && <div className="bg-slate-400 h-1 rounded-xl w-full"></div>}

  </div>
}


export default Bar
