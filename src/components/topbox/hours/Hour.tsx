import { useEffect, useState } from "react";
import { THour } from "./types";
import { Center } from "./center.model";
import Status from "./Status";

type Props = {
  hours: THour
}

const Hour = (props: Props) => {
  const { hours } = props;
  const center = new Center(hours.name, hours.hours)
  const [open, setOpen] = useState(center.isOpen())

  useEffect(() => {
    setInterval(() => {
      setOpen(center.isOpen())

    }, 6000)
  }, [])
  console.log(center, center.isOpen())
  return <div className="flex-col">
    <h2 className="text-3xl font-light">{hours.name}</h2>
    <div className="flex gap-2 items-center">
      <Status open={open} />
      <h3 className={`${open ? 'text-green-300' : 'text-red-300'} text-1xl font-bold m-0`}>{`${center.start} - ${center.end}`}</h3>
    </div>
  </div>
}

export default Hour;
