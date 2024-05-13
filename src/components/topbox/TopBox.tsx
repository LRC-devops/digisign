import DateTime from "./DateTime"
import Hours from "./Hours"
import MinimizedAnnouncements from "./MinimizedAnnouncements"

const TopBox = () => {
  return <div className="flex justify-between ">
    <DateTime />
    <MinimizedAnnouncements />
    <Hours />
  </div>
}

export default TopBox
