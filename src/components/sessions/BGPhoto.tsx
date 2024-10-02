import { useEffect, useState } from "react"
import { CalendarSession, ScheduledSession } from "./session.model"
import { motion } from "framer-motion"
import { resolveAWSPhotoRedirect } from "../../api/photo"

const IMG_FALLBACK = "/card-fallback.jpg"
type Props = {
  session: ScheduledSession | CalendarSession
}
const BGPhoto = ({ session }: Props) => {
  const [loading, setLoading] = useState(true)
  const [uri, setUri] = useState(session.photo || session.upPhoto?.url || IMG_FALLBACK)
  useEffect(() => {
    /**
     * Use axios to resolve the URI redirect from the LRC Server, then set the URI to the responseURL. 
     * Handles errors to fallback and non-lrcapi urls return undefined.
      */
    async function resolveURI(uri: string) {
      const res = await resolveAWSPhotoRedirect(uri)
      let resolved_uri = IMG_FALLBACK
      if (res instanceof Error) {
        resolved_uri = IMG_FALLBACK
      } else if (!res) {
        resolved_uri = uri
      } else {
        resolved_uri = res
      }
      setUri(resolved_uri)
      setLoading(false)
    }
    resolveURI(uri)

  }, [uri])

  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    exit={{ opacity: 0 }}
    className="absolute top-0 left-0 right-0 bottom-0 bg-gold-500 z-[-1]">

    {loading ?
      <img className="w-full h-full object-cover blur" src="/card-fallback.jpg" />
      :
      <img className="w-full h-full object-cover" src={uri} />

    }
  </motion.div>

}

export default BGPhoto
