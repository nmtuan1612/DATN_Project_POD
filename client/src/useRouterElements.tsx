import React, { useContext } from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
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
import UserLayout from './pages/User/layout/UserLayout'
import ManageMyStores from './pages/User/pages/ManageMyStores/ManageMyStores'
import { AppContext } from './context/app.context'
import AccountSetting from './pages/User/pages/AccountSetting/AccountSetting'
import StoreLayout from './pages/Store/layout/StoreLayout'
import CreateStore from './pages/Store/pages/CreateStore/CreateStore'
import StoreDetail from './pages/Store/pages/StoreDetail/StoreDetail'
import StoreSetting from './pages/Store/pages/StoreSetting/StoreSetting'
import StoreManageProducts from './pages/Store/pages/StoreManageProducts/StoreManageProducts'
import StoreManageOrders from './pages/Store/pages/StoreManageOrders/StoreManageOrders'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
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
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            { path: path.userDetail, element: <UserDetail /> },
            { path: path.userStores, element: <ManageMyStores /> },
            { path: path.userSetting, element: <AccountSetting /> }
          ]
        },
        {
          path: path.createShop,
          element: (
            <MainLayout>
              <CreateStore />
            </MainLayout>
          )
        },
        {
          path: path.shopDetail,
          element: (
            <MainLayout>
              <StoreDetail />
            </MainLayout>
          )
        },
        {
          path: path.shop,
          element: (
            <MainLayout>
              <StoreLayout />
            </MainLayout>
          ),
          children: [
            { path: path.shopManageProducts, element: <StoreManageProducts /> },
            { path: path.shopManageOrder, element: <StoreManageOrders /> },
            { path: path.shopSetting, element: <StoreSetting /> }
          ]
        }
      ]
    },
    {
      path: path.category,
      element: <Navigate to={path.home} replace />
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
      path: path.products,
      element: <Navigate to={path.home} replace />
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
        <EditorPage />
        // <MainLayout>
        // </MainLayout>
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
