import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Canvas from './canvas'
// import Customizer from './pages/Customizer'
// import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import useRouterElements from './useRouterElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const router = useRouterElements()
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      {/* <main className='app transition-all ease-in'>
        <Home />
        <Canvas />
        <Customizer />
      </main> */}
    </>
  )
}

export default App
