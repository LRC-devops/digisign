import { MaxAnn as IMaxAnn } from "./types"
import { motion } from "framer-motion"
import BottomGradient from "../sessions/BottomGradient"

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
    duration: 0.5,
  }
}
const MaxAnn = ({ a }: Props) => {
  const pan = `pan ${(a.duration / 1000) + 5}s ease-in-out infinite`
  if (a.disableAnimation) {
    return <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      exit={animation.initial}
      className="w-full h-full">
      <img
        className="w-full h-full object-cover" src={a.image.src} crossOrigin="anonymous" />
    </motion.div>
  } else {
    return <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      exit={animation.initial}
      className={`w-full h-full overflow-hidden`}>
      <motion.img
        style={{ animation: pan }}
        className={`w-full h-full`} src={a.image.src} crossOrigin="anonymous" />
      <div className="absolute z-5 text-white bottom-0 left-0 right-0">
        <BottomGradient>
          <div className="p-2 mb-5">
            <h1 className="text-8xl font-light mb-3">{a.heading}</h1>
            <h2 className="text-5xl">{a.subhead}</h2>
            <p className="text-2xl">{a.paragraph}</p>
          </div>
        </BottomGradient>
      </div>
    </motion.div>
  }
}

export default MaxAnn
