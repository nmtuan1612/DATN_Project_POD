import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppProvider } from './context/app.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId='665491888833-67430qmubpgvlt7nmoa7mpi7l2a613km.apps.googleusercontent.com'>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
