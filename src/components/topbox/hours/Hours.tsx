import { useEffect, useState } from "react";
import { getHours } from "../../../api/hours";
import { THour } from "./types";
import LoadingSpinner from "../../LoadingSpinner";
import Hour from "./Hour";
import { ComponentError } from "../../error/types";

const Hours = () => {
  const [data, setData] = useState<THour[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ComponentError>({ hasError: false, msg: null })

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data: THour[] | Error = await getHours();

        if (data instanceof Error) {
          throw data;
        }
        setData(data)
        setLoading(false)

      } catch (err) {
        console.error("[Hours]: error getting data: ", err)
        let error = err as Error;
        setError({ hasError: true, msg: error.message })

        setLoading(false)
      }
    }
    getData()
  }, [])

  if (error.hasError) {
    throw new Error(error.msg || "Unknown error occurred")
  }


  if (!data || loading) {
    return <LoadingSpinner loading={true} />
  }

  return <div className="flex flex-col h-full justify-between min-w-[22vw]">
    {data.map((h, idx) => (
      <Hour key={idx} hours={h} />
    ))}
  </div>
}

export default Hours;
