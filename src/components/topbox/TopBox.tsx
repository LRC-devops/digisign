import ErrorBoundary from "../error/ErrorBoundary"
import DateTime from "./DateTime"
import MinAnns from "./MinAnns/MinAnns"
import Hours from "./hours/Hours"

const TopBox = () => {
  // return <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-10 overflow-hidden min-w-0 min-h-0">
  return <div className="flex justify-between gap-10 min-w-0 min-h-0 max-h-[18vh]">
    <DateTime />
    <ErrorBoundary>
      <MinAnns />
    </ErrorBoundary>
    <ErrorBoundary>
      <Hours />
    </ErrorBoundary>
  </div>
}

export default TopBox
