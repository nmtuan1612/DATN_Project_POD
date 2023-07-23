import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    // exact: true,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <main className="app transition-all ease-in">
        {/* <Home />
        <Canvas />
        <Customizer /> */}
      </main>
    </RouterProvider>
  );
}

export default App;
