import ErrorBoundary from "../error/ErrorBoundary"
import DateTime from "./DateTime"
import MinAnns from "./MinAnns/MinAnns"
import Hours from "./hours/Hours"

const TopBox = (props: { token: string }) => {
  return <div className="flex justify-between gap-10 min-w-0 min-h-0 h-[18vh] ">
    <DateTime />
    <ErrorBoundary>
      <MinAnns token={props.token} />
    </ErrorBoundary>
    <ErrorBoundary>
      <Hours token={props.token} />
    </ErrorBoundary>
  </div>
}

export default TopBox
