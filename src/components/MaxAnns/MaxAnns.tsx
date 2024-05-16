import { useEffect, useReducer, useState } from "react"
import { Config, MaxAnn as IMaxAnn } from "./types"
import { ComponentError } from "../error/types"
import { getAnnouncements } from "../../api/maxanns"
import ProgressBars from "../pages/ProgressBars"
import MaxAnn from "./MaxAnn"
import { AnimatePresence, motion } from "framer-motion"

type Props = {
  running: boolean
  setRunning: (running: boolean) => void
  config: Config | null
}

type State = {
  curr: number,
  dur: number,
  announcements: IMaxAnn[][]
  currentPage: number,
  totalPages: number
}

type Action =
  | { type: "next" }
  | { type: "setAnnouncements", payload: { anns: IMaxAnn[][], totalPages: number } }
// | { type: "nextPage" }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'next':
      var curr = (state.curr + 1) % state.announcements[state.currentPage].length
      var dur = state.announcements[state.currentPage][curr].duration + 1000 // plus animation offset
      return {
        ...state, curr, dur
      }
    case 'setAnnouncements':
      var { anns, totalPages } = action.payload
      return {
        ...state, announcements: anns, totalPages
      }
    // case 'nextPage':
    //   var curr = (state.totalPages % 1) + 1
    //   return {
    //     ...state, currentPage: curr, curr: 0
    //   }
  }
}

const initialState: State = {
  curr: 0,
  dur: 12000,
  announcements: [],
  currentPage: 0,
  totalPages: 0
}

const sectionAnnouncements = (anns: IMaxAnn[]): { anns: IMaxAnn[][], totalPages: number } => {
  const out = [];
  var page = [];
  const PAGE_SIZE = 3; // NOTE: maybe make this part of the config?
  let count = 0;
  for (let a of anns) {
    if (page.length >= PAGE_SIZE) {
      out.push(page);
      count = 0;
      page = [];
    }
    page.push(a)
  }
  if (page.length > 0) {
    out.push(page);
  }
  return { anns: out, totalPages: out.length };
}

const MaxAnns = ({ config, running, setRunning }: Props) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, currentPage: 1 || 0, totalPages: config?.totalPages || 0 })
  // const [error, setError] = useState<ComponentError>({ hasError: false, msg: null })
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // setLoading(true)
        const res = await getAnnouncements();
        if (res instanceof Error) {
          throw res;
        }
        for (let a of res) {
          var img = new Image();
          img.src = a.imageUrl;
          img.crossOrigin = "anonymous"
          a.image = img
        }
        dispatch({ type: "setAnnouncements", payload: sectionAnnouncements(res) })
        // setLoading(true)
      } catch (err) {
        // setLoading(true)
        const error = err as Error;
        console.error("maximized announcement error:", err)
        // setError({ hasError: true, msg: error.message || "Unknown error" })
      }
    }

    fetchAnnouncements();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "next" })
    }, state.dur)

    return () => {
      clearInterval(interval)
    }
  }, [state.dur])



  // TODO: Once the snackbar (notifications like "announcements starting soon...") is built will send errors there.
  // if (error.hasError) {
  //   console.log("error")
  //   throw new Error(error.msg || "An unknown error occurred.")
  // }
  if (state.announcements.length < 1) {
    // setRunning(false); // should enable this for production
    console.log("no announcements to run...")
    return <></>
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

  return <div className="w-full h-full">
    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 via-black/10 to-black/0 z-10">
      <div className="w-full h-full p-5">
        <ProgressBars
          currentIdx={state.curr}
          bars={state.announcements[state.currentPage].map(a => a.duration)}
        />
      </div>
    </div>
    <AnimatePresence>
      <motion.div
        className="overflow-hidden"
      // layout
      // initial={animation.initial}
      // animate={animation.animate}
      // transition={animation.transition}
      // exit={animation.initial}
      >
        <MaxAnn
          key={state.announcements[state.currentPage][state.curr].name}
          a={state.announcements[state.currentPage][state.curr]} />
      </motion.div>
    </AnimatePresence>
  </div>
}

export default MaxAnns
