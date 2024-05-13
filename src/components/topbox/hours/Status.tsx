type Props = {
  open: boolean;
}
const Status = ({ open }: Props) => {
  return <div className={`${open ? "bg-green-300" : 'bg-red-300'} h-4 w-4 rounded-[50%]`}></div >
}

export default Status
