import Bar from "./Bar";

type Props = {
  bars: number[],
  currentIdx: number

}
const ProgressBars = (props: Props) => {

  console.log("[PROGRESS_BARS]: rerendered...")

  return <div className="w-full flex gap-3 h-2">
    {props.bars.map((dur: number, idx: number) => {
      let status: "active" | "pre" | "post" = "active";
      if (props.currentIdx < idx) {
        status = "pre"
      } else if (props.currentIdx > idx) {
        status = "post"
      }
      return <Bar duration={dur} key={idx} status={status} />
    }
    )}
  </div>
}

export default ProgressBars;
