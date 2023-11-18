import { RouterProvider } from 'react-router-dom'
// import Customizer from './pages/Customizer'
// import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRouterElements from './useRouterElements'

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
