import { useState } from "react"
import { MaxAnn as IMaxAnn } from "./types"
import { motion } from "framer-motion"
import LoadingSpinner from "../LoadingSpinner"

type Props = {
  a: IMaxAnn
}

const animation = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  transition: {
    duration: 1,
  }
}
const MaxAnn = ({ a }: Props) => {
  if (a.disableAnimation) {
    return <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      exit={animation.initial}
      className="w-full h-full">
      <img
        onLoad={() => {
          console.log("img ready")
        }}
        className="w-full h-full object-cover" src={a.image.src} crossOrigin="anonymous" />
    </motion.div>
  } else {
    return <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      exit={animation.initial}
      className="w-full h-full">
      <motion.img
        // initial={{ x: 100, scale: 1.5 }}
        // animate={{ x: -100 }}
        // transition={{ duration: a.duration / 1000, ease: "easeInOut" }}
        // onLoad={() => {
        //   console.log("img ready")
        // }}
        className="w-full h-full object-cover animate-[pan_10s_ease-in-out_infinite]" src={a.image.src} crossOrigin="anonymous" />
    </motion.div>
  }


}

export default MaxAnn
