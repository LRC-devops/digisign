import { useEffect, useReducer } from "react"
import { Config, MaxAnn as IMaxAnn } from "./types"
import ProgressBars from "../pages/ProgressBars"
import MaxAnn from "./MaxAnn"
import { motion } from "framer-motion"


type Props = {
  running: boolean
  setRunning: (running: boolean) => void
  config: Config
  announcements: IMaxAnn[]
}

type State = {
  curr: number,
  next: number,
  dur: number,
  announcements: IMaxAnn[]
  currentPage: number,
  totalPages: number
}

type NextAction = { type: "next", payload: { setRunning: (running: boolean) => void } }
type Action =
  | NextAction
  | { type: "reset" }
// | { type: "setConfig", payload: Config }


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'next':
      var curr = (state.curr + 1) % state.announcements.length
      var next = (curr + 1) % state.announcements.length
      var dur = state.announcements[curr].duration + 1000 // plus animation offset
      return {
        ...state, curr, dur, next
      }
    case 'reset':
      var curr = 0;
      var next = 0;
      var dur = state.announcements[curr].duration + 1000 // plus animation offset
      return {
        ...state, curr, dur
      }
    // case 'setConfig':
    //   return {
    //     ...state, currentPage: action.payload.currentPage
    //   }
  }
}

const initialState: State = {
  curr: 0,
  dur: 12000,
  announcements: [],
  currentPage: 0,
  totalPages: 0,
  next: 1,
}

const MaxAnns = ({ config, setRunning, announcements }: Props) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, announcements, currentPage: config.currentPage, totalPages: config.totalPages })
  console.log("[maxanns]: mounting with state: ", state)


  // useEffect(() => {
  //   if (!config) {
  //     return;
  //   }
  //   dispatch({ type: "setConfig", payload: config })
  // }, [config])


  useEffect(() => {
    const interval = setInterval(() => {
      if (state.next === 0) {
        console.log("[maxanns]: resetting")
        dispatch({ type: "reset" })
        console.log("[maxanns]: stopping")
        return setRunning(false)
      } else {
        var action: NextAction = { type: "next", payload: { setRunning } }
        dispatch(action)
      }
    }, state.dur)

    return () => {
      clearInterval(interval)
    }
  }, [state])


  if (state.announcements.length < 1) {
    console.log("no announcements to run...")
    return <></>
  }
  console.log("[maxanns]: config: ", config, "state: ", state)

  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    key="announcements"
    className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 via-black/10 to-black/0 z-10">
      <div className="w-full h-full p-5">
        <ProgressBars
          currentIdx={state.curr}
          bars={state.announcements.map(a => a.duration)}
        />
      </div>
    </div>
    <motion.div
      className="overflow-hidden"
    >
      <MaxAnn
        key={state.announcements[state.curr].name}
        a={state.announcements[state.curr]} />
    </motion.div>
  </motion.div>
}

export default MaxAnns
