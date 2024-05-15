import { AnimatePresence, motion } from "framer-motion";
import { MinimizedAnnouncement } from "./types";
import AnimatedImage from "../../AnimatedImage";

type Props = {

  announcement: MinimizedAnnouncement
}

const MinAnn = (props: Props) => {
  const { heading, details, image, subheads } = props.announcement;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-between h-full pt-2" >
        <motion.div className="flex flex-col justify-between h-full">
          {subheads.map((h, idx: number) => (
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="font-bold text-2xl m-0" key={idx}>{h}</motion.h3>
          ))}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-5xl font-thin m-0">{heading}</motion.h2>
          {details.map((d, idx: number) => (
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className='text-2xl m-0' key={idx}>{d}</motion.h3>
          ))}
        </motion.div>
        <AnimatedImage src={image}
          componentProps={{ className: "max-h-[20vh] h-auto ml-auto", crossOrigin: "anonymous" }}
        />
      </motion.div >
    </AnimatePresence >
  )
}

export default MinAnn;
