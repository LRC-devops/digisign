type Props = {
  credit: string
}
const Credits = ({ credit }: Props) => {
  return <div className="bg-slate-900/50 p-1  mr-2 mt-2 ml-auto rounded-s">
    <p className="">Photo by: {credit}</p>
  </div>
}

export default Credits
