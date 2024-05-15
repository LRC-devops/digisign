import { ReactElement } from "react"

type Props = {
  children: ReactElement
}
const CardContainer = ({ children }: Props) => {
  return <div className="relative flex-[1_1_30%] min-w-[32%] flex flex-col overflow-hidden rounded-md">{children}</div>
}

export default CardContainer
