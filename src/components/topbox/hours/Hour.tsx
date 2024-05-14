import { useEffect, useState } from "react";
import { THour } from "./types";
import { Center } from "./center.model";
import Status from "./Status";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  hours: THour
}

const Hour = (props: Props) => {
  const { hours } = props;
  const center = new Center(hours.name, hours.hours)
  const [open, setOpen] = useState(center.isOpen())

  useEffect(() => {
    setInterval(() => {
      setOpen(center.isOpen())

    }, 6000)
  }, [])

  return <AnimatePresence>
    <div className="flex-col">
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-3xl font-light">{hours.name}</motion.h2>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex gap-2 items-center">
        <Status open={open} />
        <h3 className={`${open ? 'text-green-300' : 'text-red-300'} text-1xl font-bold m-0`}>{`${center.start} - ${center.end}`}</h3>
      </motion.div>
    </div>
  </AnimatePresence>
}

export default Hour;
