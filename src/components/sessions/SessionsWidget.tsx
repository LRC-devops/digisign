import { useEffect, useState } from "react";
import { getSessions } from "../../api/sessions";
import { ComponentError } from "../error/types";
import LoadingSpinner from "../LoadingSpinner";
import SessionCard from "./SessionCard";
import ErrorBoundary from "../error/ErrorBoundary";
import { ISession } from "./types";


const SessionsWidget = () => {
  const [data, setData] = useState<ISession[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ComponentError>({ hasError: false, msg: null })

  // NOTE: works, disabled for building the sessioncard
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await getSessions();
        if (res instanceof Error) {
          throw data;
        }
        setData(res)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        const error = err as Error;
        setError({ hasError: true, msg: error.message || "An unknown error occurred" })
      }
    }
    getData()

  }, [])

  if (error.hasError) {
    throw new Error(error.msg || "An unknown error occurred")
  }
  if (loading) {
    return <LoadingSpinner loading={loading} />
  }

  return <div className="w-full h-full pt-10 flex flex-wrap justify-between gap-3">
    <ErrorBoundary>
      {data.map((s: ISession, idx: number) => (
        <SessionCard session={s} key={idx} />
      ))}
    </ErrorBoundary>
  </div>

}

export default SessionsWidget;
