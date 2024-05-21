import './index.css'
import MainView from './components/MainView'
import useAuth from './hooks/useAuth'
import NotAuthenticated from './components/auth/NotAuthenticated'
import ErrorBoundary from './components/error/ErrorBoundary'

function App() {
  const { isAuth, token } = useAuth()

  if (!isAuth || !token || token.length < 1) {
    return <ErrorBoundary>
      <NotAuthenticated />
    </ErrorBoundary>
  }
  return (
    <ErrorBoundary>
      <MainView token={token} />
    </ErrorBoundary>
  )
}

export default App
