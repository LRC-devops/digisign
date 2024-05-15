import { AnimatePresence, motion } from "framer-motion"
type Props = {
  src: string
  componentProps: any
}
const AnimatedImage = ({ src, componentProps }: Props) => {

  return <AnimatePresence>
    <motion.img
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      src={src}
      {...componentProps} />
  </AnimatePresence>
}

export default AnimatedImage
