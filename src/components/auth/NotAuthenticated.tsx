import useAuth from "../../hooks/useAuth"

const NotAuthenticated = () => {
  const { isAuth, name } = useAuth()
  if (isAuth) {
    return <></>
  }

  return <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center p-10 border-2 border-green-500 rounded-md">
    <div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-center mb-10 text-green-500 opacity-5">
        <h1 className="text-[45vh] leading-none font-bold">LRC <span className="font-thin tracking-tighter">DigiSign</span></h1>
      </div>
      <div className="flex items-center justify-center border-2 border-green-500 p-3 rounded-s mb-5">
        <h2 className="text-3xl text-green-500">{name}</h2>
      </div>
      <h2 className="text-3xl mb-3">Please follow the steps below to authenticate this device: </h2>
      <ul className="list-decimal">
        <li>Navigate to the LRC Admin Console: <span className="text-green-500 underline">www.learning-resources-center.com/learning-resources-center/admin-console?tab=devices</span></li>
        <li>Locate the device with the same device name: <span className="text-green-500 underline">{name}</span></li>
        <li>Once you&apos;ve found the device, click on the three dots in the upper right-hand corner and select &apos;Verify Device&apos;</li>
        <li>Refresh this page to begin using the LRC DigiSign application for Web!</li>
      </ul>
    </div>
  </div>

}

export default NotAuthenticated
