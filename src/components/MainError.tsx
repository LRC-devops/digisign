import { CiWarning } from "react-icons/ci"
import { ComponentError } from "./error/types"

type Props = {
  error: ComponentError
}

const MainError = ({ error }: Props) => {
  return <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center rounded-md border-cancel-200 border-2">
    <div className="felx-col justify-center items-center text-center">
      <CiWarning className="m-auto mb-3 text-7xl text-cancel-200" />
      <h1 className="text-cancel-200 text-5xl font-light">Uh oh! Something wen't wrong...</h1>
      <h2 className="mt-3 text-xl font-bold">{error.msg}</h2>
    </div>
  </div>
}

export default MainError
