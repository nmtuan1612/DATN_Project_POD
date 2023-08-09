import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Canvas from './canvas'
// import Customizer from './pages/Customizer'
// import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import useRouterElements from './useRouterElements'

function App() {
  const router = useRouterElements()
  return (
    <>
      <RouterProvider router={router} />
      {/* <main className='app transition-all ease-in'>
        <Home />
        <Canvas />
        <Customizer />
      </main> */}
    </>
  )
}

export default App
