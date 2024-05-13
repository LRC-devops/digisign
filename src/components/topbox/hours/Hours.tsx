import { useEffect, useState } from "react";
import { getHours } from "../../../api/hours";
import { THour } from "./types";
import LoadingSpinner from "../../LoadingSpinner";
import Hour from "./Hour";

const Hours = () => {
  const [data, setData] = useState<THour[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const data = await getHours();
      setData(data)
      setLoading(false)
    }
    getData()
  }, [])

  console.log(data)

  if (!data || loading) {
    return <LoadingSpinner loading={true} />
  }

  return <div className="flex flex-col h-full justify-between min-w[22vw]">
    {data.map((h, idx) => (
      <Hour key={idx} hours={h} />
    ))}
  </div>
}

export default Hours;
