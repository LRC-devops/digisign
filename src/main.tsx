import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import SentryInit from './utils/sentry.ts'

SentryInit()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
