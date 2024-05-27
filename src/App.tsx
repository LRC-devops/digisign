import './index.css'
import MainView from './components/MainView'
import useAuth from './hooks/useAuth'
import NotAuthenticated from './components/auth/NotAuthenticated'
import ErrorBoundary from './components/error/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import { useEffect, useState } from 'react'
import MainError from './components/MainError'

function App() {
  const { isAuth, token, loading, error } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(loading)
    }, 1000)

  }, [loading])

  if (error.hasError) {
    return <MainError error={error} />
  }
  if (loading || isLoading) {
    return <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <LoadingSpinner loading={isLoading} />
    </div>
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
