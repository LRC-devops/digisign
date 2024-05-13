import { useEffect, useReducer, useState } from "react";
import { getMinAnns } from "../../../api/minanns";
import MinAnn from "./MinAnn";
import LoadingSpinner from "../../LoadingSpinner";
import { MinimizedAnnouncement } from "./types";

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


  useEffect(() => {
    const getAnnouncements = async () => {
      console.log('fetching announcements')
      setLoading(true)
      const data: MinimizedAnnouncement[] = await getMinAnns();
      if (data) {
        dispatch({ type: 'setAnnouncements', payload: data })
      }
      setData(data)
      setLoading(false)
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

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('next announcement')
      dispatch({ type: 'next' })
    }, state.duration)

    return () => {
      clearInterval(timer)
    }
  }, [state.duration])

  if (!data || loading) {
    return <LoadingSpinner loading={true} />
  }


  return (
    <div>
      <MinAnn announcement={data[state.curr]} />
    </div>
  )
}

export default MinAnns;
