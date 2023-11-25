import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppProvider } from './context/app.context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'src/redux/store/store'
import ErrorBoundary from './components/ErrorBoundary'
import { Provider } from 'react-redux'
// globalThis.Buffer = Buffer
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId='665491888833-67430qmubpgvlt7nmoa7mpi7l2a613km.apps.googleusercontent.com'>
    {/* <React.StrictMode> */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading='loading' persistor={persistor}>
          <AppProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
)
