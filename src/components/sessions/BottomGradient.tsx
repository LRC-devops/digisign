import { ReactElement } from "react";

type Props = {
  children: ReactElement
}
const BottomGradient = (props: Props) => {
  return <div className="w-full mt-auto p-5 pt-20 bg-gradient-to-t from-black/100 via-black/70 to-black/0">
    {props.children}
  </div>
}

export default BottomGradient;
