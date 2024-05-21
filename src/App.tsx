import './index.css'
import MainView from './components/MainView'
import useAuth from './hooks/useAuth'
import NotAuthenticated from './components/auth/NotAuthenticated'
import ErrorBoundary from './components/error/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { isAuth, token, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner loading={loading} />
  }

  if (!isAuth) {
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
