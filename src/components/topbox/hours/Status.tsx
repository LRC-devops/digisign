type Props = {
  open: boolean;
}
const Status = ({ open }: Props) => {
  return <div className={`${open ? "bg-green-300" : 'bg-red-300'} h-2 w-2 rounded-[50%]`}></div >
}

export default Status
