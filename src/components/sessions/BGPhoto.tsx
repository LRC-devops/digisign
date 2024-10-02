import { useState } from "react"
import { CalendarSession, ScheduledSession } from "./session.model"
import { motion } from "framer-motion"

type Props = {
  session: ScheduledSession | CalendarSession
}
const BGPhoto = ({ session }: Props) => {
  var uri = session.photo || session.upPhoto?.url || "/card-fallback.jpg"
  const [loading, setLoading] = useState(true)
  const [img, setImg] = useState<HTMLImageElement>(() => {
    const image = new Image()
    image.src = uri
    setLoading(false)
    image.onload = () => {
    }
    image.onerror = () => {
      img.src = "/card-fallback.jpg"
      console.warn("image error", img)
    }
    image.className = "w-full h-full object-cover"
    return image
  })

  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    exit={{ opacity: 0 }}
    className="absolute top-0 left-0 right-0 bottom-0 bg-gold-500 z-[-1]">
    {/* {img} */}
    {loading ?
      <img className="w-full h-full object-cover blur" src="/card-fallback.jpg" />
      :
      <img className="w-full h-full object-cover" src={img.src} />
    }
  </motion.div>

}

export default BGPhoto
