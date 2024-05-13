import "../spinner.css"
type Props = {
  loading: boolean
}
const LoadingSpinner = (props: Props) => {
  if (!props.loading) {
    return <></>
  }

  return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
}

export default LoadingSpinner
