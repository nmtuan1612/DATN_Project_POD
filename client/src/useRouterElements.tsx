import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import path from './config/path'
import { AppContext } from './context/app.context'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import StoreLayout from './pages/Store/layout/StoreLayout'
import UserLayout from './pages/User/layout/UserLayout'
const CreateStore = lazy(() => import('./pages/Store/pages/CreateStore/CreateStore'))
const StoreDetail = lazy(() => import('./pages/Store/pages/StoreDetail/StoreDetail'))
const StoreManageOrders = lazy(() => import('./pages/Store/pages/StoreManageOrders/StoreManageOrders'))
const StoreManageProducts = lazy(() => import('./pages/Store/pages/StoreManageProducts/StoreManageProducts'))
const StoreSetting = lazy(() => import('./pages/Store/pages/StoreSetting/StoreSetting'))
const AccountSetting = lazy(() => import('./pages/User/pages/AccountSetting/AccountSetting'))
const ManageMyStores = lazy(() => import('./pages/User/pages/ManageMyStores/ManageMyStores'))
const UserDetail = lazy(() => import('./pages/User/pages/UserDetail/UserDetail'))
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'))
const EditorPage = lazy(() => import('./pages/EditorPage/EditorPage'))
// const Home = lazy(() => import('./pages/Home/Home'))
import Home from './pages/Home/Home'
const NotFound = lazy(() => import('./pages/NotFoundPage'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const Register = lazy(() => import('./pages/Register/Register'))
const Login = lazy(() => import('./pages/Login/Login'))
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'))

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
              <Suspense>
                <Login />
              </Suspense>
            </AuthLayout>
          )
        },
        {
          path: path.register,
          element: (
            <AuthLayout>
              <Suspense>
                <Register />
              </Suspense>
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
            {
              path: path.userDetail,
              element: (
                <Suspense>
                  <UserDetail />
                </Suspense>
              )
            },
            {
              path: path.userStores,
              element: (
                <Suspense>
                  <ManageMyStores />
                </Suspense>
              )
            },
            {
              path: path.userSetting,
              element: (
                <Suspense>
                  <AccountSetting />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.createShop,
          element: (
            <MainLayout>
              <Suspense>
                <CreateStore />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.shopDetail,
          element: (
            <MainLayout>
              <Suspense>
                <StoreDetail />
              </Suspense>
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
            {
              path: path.shopManageProducts,
              element: (
                <Suspense>
                  <StoreManageProducts />
                </Suspense>
              )
            },
            {
              path: path.shopManageOrder,
              element: (
                <Suspense>
                  <StoreManageOrders />
                </Suspense>
              )
            },
            {
              path: path.shopSetting,
              element: (
                <Suspense>
                  <StoreSetting />
                </Suspense>
              )
            }
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
          <Suspense>
            <CategoryPage />
          </Suspense>
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
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.editProduct,
      element: (
        <Suspense>
          <EditorPage />
        </Suspense>
        // <MainLayout>
        // </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          {/* <Suspense> */}
          <Home />
          {/* </Suspense> */}
        </MainLayout>
      ),
      errorElement: (
        <Suspense>
          <ErrorPage />
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return router
}

export default useRouterElements
