import { AnimatePresence, motion } from "framer-motion";
import { MinimizedAnnouncement } from "./types";

type Props = {

  announcement: MinimizedAnnouncement
}

const MinAnn = (props: Props) => {
  const { heading, details, image, subheads } = props.announcement;
  console.log(image)
  return (
    <AnimatePresence>
      <motion.div animate={{ opacity: 100 }} transition={{ from: 0, duration: 2 }} className="w-auto flex justify-between h-full min-h-[0] min-w-0 overflow-hidden" >
        <div className="flex flex-col justify-between">
          {subheads.map((h, idx: number) => (
            <h3 className="font-bold text-2xl" key={idx}>{h}</h3>
          ))}
          <h2 className="text-5xl font-thin">{heading}</h2>
          {details.map((d, idx: number) => (
            <h3 className='text-2xl' key={idx}>{d}</h3>
          ))}
        </div>
        <img className="max-h-[20vh] h-auto" src={image} crossOrigin="anonymous" />
      </motion.div >
    </AnimatePresence >
  )
}

export default MinAnn;
