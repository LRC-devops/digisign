import SessionsWidget from './components/sessions/SessionsWidget'
import TopBox from './components/topbox/TopBox'
import './index.css'
/*
  * TODO:
  * Top Widgets:
  *   Time
  *   Min Anns
  *   Hours
  * Main:
  *   Sessions
  *   Max Announcements
  * Authentication
  * Cacheing
  *
  * BUG:
  * need to test cacheing with chromecast!! May be a major reason to switch to raspberrypi
  * Also should research tradeoffs for using the mem card with raspberrypi vs using ext storage (more viable for long term?)
*/
function App() {

  return (
    <main className="flex w-[100vw] h-[100vh] p-10 bg-[url('/bg.jpg')]">
      <div className='flex flex-col justify-between align-middle w-full h-full z-0'>
        <TopBox />
        <SessionsWidget />
        {/* <div className='bg-red-300 h-full'></div> */}
      </div>
    </main>
  )
}

export default App
