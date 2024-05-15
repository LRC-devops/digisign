import { useEffect, useReducer, useState } from "react";
import { getMinAnns } from "../../../api/minanns";
import MinAnn from "./MinAnn";
import LoadingSpinner from "../../LoadingSpinner";
import { MinimizedAnnouncement } from "./types";
import { ComponentError } from "../../error/types";
import ProgressBars from "../../pages/ProgressBars";


interface State {
  announcements: MinimizedAnnouncement[];
  curr: number;
  duration: number;
}
type Action =
  | { type: 'next' }
  | { type: 'setAnnouncements'; payload: MinimizedAnnouncement[] }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "next":
      const curr = (state.curr + 1) % state.announcements.length;
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

  }
}
const initialState: State = {
  announcements: [],
  curr: 0,
  duration: 5000
}

const MinAnns = () => {
  const [data, setData] = useState<MinimizedAnnouncement[] | null>(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ComponentError>({ hasError: false, msg: null });



  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        setLoading(true)
        const data: MinimizedAnnouncement[] | Error = await getMinAnns();
        if (data instanceof Error) {
          throw data;
        }
        if (data) {
          dispatch({ type: 'setAnnouncements', payload: data })
        }
        setData(data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        const error = err as Error;
        setError({ hasError: true, msg: error.message })
        console.error("[MinAnns]: error fetching announcements: ", err);
      }
    }
    if (state.announcements.length === 0) {
      getAnnouncements();
    }
    // const reFetch = setInterval(() => {
    //   getAnnouncements();
    // }, 15000)
    // return () => {
    //   clearInterval(reFetch)
    // }
  }, [])

  if (error.hasError) {
    throw new Error(error.msg || "Unknown error occurred")
  }
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'next' })
    }, state.duration)

    return () => {
      clearInterval(timer)
    }
  }, [state.duration])

  if (error.hasError) {
    throw new Error(error.msg || "Unknown error occurred")
  }
  if (!data || loading) {
    return <LoadingSpinner loading={true} />
  }



  return (
    <div className="w-full h-full">
      <ProgressBars
        currentIdx={state.curr}
        bars={state.announcements.map(a => a.duration)}
      />
      <MinAnn key={state.curr} announcement={data[state.curr]} />
    </div>
  )
}

export default MinAnns;
