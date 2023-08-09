import React from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import authState from './store/authentication'
import Login from './pages/Login/Login'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import path from './config/path'
import Register from './pages/Register/Register'
import UserDetail from './pages/User/pages/UserDetail/UserDetail'
import MainLayout from './layouts/MainLayout/MainLayout'
import NotFound from './pages/NotFoundPage'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import EditorPage from './pages/EditorPage/EditorPage'

function ProtectedRoute() {
  const { isAuthenticated } = useSnapshot(authState)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useSnapshot(authState)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouterElements = () => {
  const router = createBrowserRouter([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: path.register,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [{ path: path.userDetail, element: <UserDetail /> }]
    },
    {
      path: path.categoryProduct,
      element: (
        <MainLayout>
          <CategoryPage />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.editProduct,
      element: (
        <MainLayout>
          <EditorPage />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return router
}

export default useRouterElements
