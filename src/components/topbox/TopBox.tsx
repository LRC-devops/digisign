import DateTime from "./DateTime"
import MinAnns from "./MinAnns/MinAnns"
import Hours from "./hours/Hours"

const TopBox = () => {
  // return <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-10 overflow-hidden min-w-0 min-h-0">
  return <div className="flex justify-between gap-10 min-w-0 min-h-0">
    <DateTime />
    <MinAnns />
    <Hours />
  </div>
}

export default TopBox
