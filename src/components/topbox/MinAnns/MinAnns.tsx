import { useEffect, useReducer, useState } from "react";
import { getMinAnns } from "../../../api/minanns";
import MinAnn from "./MinAnn";
import { MinimizedAnnouncement } from "./types";
import { ComponentError } from "../../error/types";
import ProgressBars from "../../pages/ProgressBars";
import { isDiff } from "../../../utils/stateDiff";
import LoadingSpinner from "../../LoadingSpinner";


interface State {
  announcements: MinimizedAnnouncement[];
  curr: number;
  duration: number;
  counter: number
}
type Action =
  | { type: 'next' }
  | { type: 'setAnnouncements'; payload: MinimizedAnnouncement[] }
  | { type: 'resetCounter' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "next":
      const curr = (state.curr + 1) % state.announcements.length;
      if (curr === 0) {
        state.counter++
      }
      const dur = Number(state.announcements[curr].duration)
      return {
        ...state, duration: dur, curr: curr
      }
    case "setAnnouncements":
      const ann = action.payload.reverse();
      const duration = +ann[0].duration;
      return {
        ...state, announcements: ann, curr: 0, duration
      }
    // counter is used to revalidate content after a set number of runs
    case "resetCounter":
      return { ...state, counter: 0 }
  }
}
const initialState: State = {
  announcements: [],
  curr: 0,
  duration: 5000,
  counter: 0
}


const MinAnns = ({ token }: { token: string }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ComponentError>({ hasError: false, msg: null });



  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        if (state.announcements.length < 1) {
          setLoading(true)
        }
        const res: MinimizedAnnouncement[] | Error = await getMinAnns(token);
        if (res instanceof Error) {
          throw res;
        }
        // check diff between current and incoming data
        // only set data if diff
        if (isDiff(state.announcements, res)) {
          dispatch({ type: "setAnnouncements", payload: res })
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
        const error = err as Error;
        setError({ hasError: true, msg: error.message })
        console.error("[MinAnns]: error fetching announcements: ", err);
      }
    }
    // initial call to get data
    if (state.announcements.length < 1) {
      getAnnouncements();
    }
    // if the counter is ready to invalidate, this runs, resets the counter, and runs a diff check to determine if the content should be replaced.
    const reFetch = setInterval(async () => {
      if (state.counter >= 4) {
        await getAnnouncements();
        dispatch({ type: "resetCounter" })
      }
    }, 1000)
    return () => {
      clearInterval(reFetch)
    }
  }, [state.announcements, state.counter])

  useEffect(() => {
    if (state.announcements.length < 1) {
      return
    }
    const timer = setInterval(() => {
      dispatch({ type: 'next' })
    }, state.duration)

    return () => {
      clearInterval(timer)
    }
  }, [state.duration, state.announcements])

  if (error.hasError) {
    throw new Error(error.msg || "Unknown error occurred")
  }
  if (loading) {
    return <LoadingSpinner loading={loading} />
  }
  if (state.announcements.length < 1) {
    return <h3>Nothing to see here...</h3>
  }

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <ProgressBars
        currentIdx={state.curr}
        bars={state.announcements.map(a => a.duration)}
      />
      <MinAnn key={state.curr} announcement={state.announcements[state.curr]} />
    </div>
  )
}

export default MinAnns;
