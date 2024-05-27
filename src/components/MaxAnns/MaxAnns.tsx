import { useEffect, useReducer } from "react"
import { MaxAnn as IMaxAnn } from "./types"
import ProgressBars from "../pages/ProgressBars"
import MaxAnn from "./MaxAnn"
import { AnimatePresence, motion } from "framer-motion"


type Props = {
  running: boolean
  setRunning: (running: boolean) => void
  announcements: IMaxAnn[]
}

type State = {
  curr: number,
  next: number,
  dur: number,
  announcements: IMaxAnn[]
}

type NextAction = { type: "next", payload: { setRunning: (running: boolean) => void } }
type Action =
  | NextAction
  | { type: "reset" }


const ANIMATION_OFFSET = 1000
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'next':
      if (state.next === 0) {
        console.log("[MaxAnns]: next=0 => returning state")
        return state;
      }
      var curr = (state.curr + 1) % state.announcements.length
      var next = (curr + 1) % state.announcements.length
      var dur = state.announcements[curr].duration + ANIMATION_OFFSET // plus animation offset
      console.log("[MaxAnns]: running next announcements")
      return {
        ...state, curr, next
      }
    case 'reset':
      var curr = 0;
      var next = 1;
      var dur = state.announcements[curr].duration + ANIMATION_OFFSET // plus animation offset
      console.log("[MaxAnns]: resetting state")
      return {
        ...state, curr, dur, next
      }
  }
}

const initialState: State = {
  curr: 0,
  dur: 12000,
  announcements: [],
  next: 1,
}

const MaxAnns = ({ setRunning, announcements }: Props) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, announcements })

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.next === 0) {
        dispatch({ type: "reset" })
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
    return <></>
  }

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
          bars={state.announcements.map(a => a.duration + ANIMATION_OFFSET)}
        />
      </div>
    </div>
    <div
      className="overflow-hidden"
    >
      <AnimatePresence>
        <MaxAnn
          key={state.curr}
          a={state.announcements[state.curr]} />
      </AnimatePresence>
    </div>
  </motion.div>
}

export default MaxAnns
