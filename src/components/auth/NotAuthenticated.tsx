import useAuth from "../../hooks/useAuth"

const NotAuthenticated = () => {
  const { isAuth, name } = useAuth()
  if (isAuth) {
    return <></>
  }

  return <div className="w-full h-full p-10">
    {/* <h1 className="text-5xl">This device is not authenticated!</h1> */}
    <h2 className="text-3xl text-green-500 mb-5">{name}</h2>
    <h2 className="text-3xl mb-3">Please follow the steps below to authenticate this device: </h2>
    {/* <h2>Using the Device Name provided below, please utilize the &apos;DEVICES&apos; tab in the LRC Admin Console</h2> */}
    <ul className="list-decimal">
      <li>Navigate to the LRC Admin Console: <span className="text-green-500 underline">www.learning-resources-center.com/learning-resources-center/admin-console?tab=devices</span></li>
      <li>Locate the device with the same device name: <span className="text-green-500 underline">{name}</span></li>
      <li>Once you&apos;ve found the device, click on the three dots in the upper right-hand corner and select &apos;Verify Device&apos;</li>
      <li>Refresh this page to begin using the LRC DigiSign application for Web!</li>
    </ul>
  </div>

}

export default NotAuthenticated
