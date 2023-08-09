import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId='665491888833-67430qmubpgvlt7nmoa7mpi7l2a613km.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
)
