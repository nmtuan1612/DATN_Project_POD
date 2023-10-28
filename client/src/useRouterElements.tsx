import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import path from './config/path'
import { AppContext } from './context/app.context'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import StoreLayout from './pages/Store/layout/StoreLayout'
import UserLayout from './pages/User/layout/UserLayout'
import Home from './pages/Home/Home'
import AddSample from './pages/AddSample/AddSample'
import FeaturedPage from './pages/FeaturedPage/FeaturedPage'
import OnlineStoreLayout from './pages/StoreOnline/layout/OnlineStoreLayout/OnlineStoreLayout'
import UserCartWrapper from './components/UserCartWrapper/UserCartWrapper'

const CreateStore = lazy(() => import('./pages/Store/pages/CreateStore/CreateStore'))
const StoreOnline = lazy(() => import('./pages/StoreOnline/pages/StoreOnline'))
const StoreOnlineProductDetail = lazy(
  () => import('./pages/StoreOnline/pages/StoreOnlineProductDetail/StoreOnlineProductDetail')
)
const StoreOnlineCheckout = lazy(() => import('./pages/StoreOnline/pages/StoreOnlineCheckout/StoreOnlineCheckout'))
const StoreOnlineCart = lazy(() => import('./pages/StoreOnline/pages/StoreOnlineCart/StoreOnlineCart'))
const StoreManageOrders = lazy(() => import('./pages/Store/pages/StoreManageOrders/StoreManageOrders'))
const StoreOrderDetail = lazy(() => import('./pages/Store/pages/StoreOrderDetail/StoreOrderDetail'))
const StoreManageProducts = lazy(() => import('./pages/Store/pages/StoreManageProducts/StoreManageProducts'))
const StoreProductDetail = lazy(() => import('./pages/Store/pages/StoreProductDetail/StoreProductDetail'))
const StoreManageChat = lazy(() => import('./pages/Store/pages/StoreManageChat/StoreManageChat'))
const StoreSetting = lazy(() => import('./pages/Store/pages/StoreSetting/StoreSetting'))

const AccountSetting = lazy(() => import('./pages/User/pages/AccountSetting/AccountSetting'))
const ManageMyStores = lazy(() => import('./pages/User/pages/ManageMyStores/ManageMyStores'))
const UserDetail = lazy(() => import('./pages/User/pages/UserDetail/UserDetail'))
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'))
const SearchResultPage = lazy(() => import('./pages/SearchResultPage/SearchResultPage'))
const EditorPage = lazy(() => import('./pages/EditorPage/EditorPage'))
const ManageMyOrders = lazy(() => import('./pages/User/pages/ManageMyOrders/ManageMyOrders'))
const UserOrderDetail = lazy(() => import('./pages/User/pages/UserOrderDetail/UserOrderDetail'))

// const Home = lazy(() => import('./pages/Home/Home'))
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
          path: path.userCart,
          element: (
            <MainLayout>
              <UserCartWrapper>
                <Suspense>
                  <StoreOnlineCart />
                </Suspense>
              </UserCartWrapper>
            </MainLayout>
          )
        },
        {
          path: path.userCheckout,
          element: (
            <MainLayout>
              <UserCartWrapper>
                <Suspense>
                  <StoreOnlineCheckout />
                </Suspense>
              </UserCartWrapper>
            </MainLayout>
          )
        },
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
            },
            {
              path: path.userOrders,
              element: (
                <Suspense>
                  <ManageMyOrders />
                </Suspense>
              )
            },
            {
              path: path.userOrderDetail,
              element: (
                <Suspense>
                  <UserOrderDetail />
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

        // Shop manage
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
            },
            {
              path: path.shopProductDetail,
              element: (
                <Suspense>
                  <StoreProductDetail />
                </Suspense>
              )
            },
            {
              path: path.shopOrderDetail,
              element: (
                <Suspense>
                  <StoreOrderDetail />
                </Suspense>
              )
            },
            {
              path: path.shopChats,
              element: (
                <Suspense>
                  <StoreManageChat />
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
      path: path.productSearchResult,
      element: (
        <MainLayout>
          <Suspense>
            <SearchResultPage />
          </Suspense>
        </MainLayout>
      )
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
      path: path.categoryFeatured,
      element: (
        <MainLayout>
          <Suspense>
            <FeaturedPage />
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
      path: path.customProduct,
      element: (
        <Suspense>
          <EditorPage />
        </Suspense>
        // <MainLayout>
        // </MainLayout>
      )
    },
    // Shop online
    {
      path: path.shopOnlineDetail,
      element: (
        <Suspense>
          <OnlineStoreLayout>
            <StoreOnline />
          </OnlineStoreLayout>
        </Suspense>
      )
    },
    {
      path: path.shopOnlineProductDetail,
      element: (
        <Suspense>
          <OnlineStoreLayout>
            <StoreOnlineProductDetail />
          </OnlineStoreLayout>
        </Suspense>
      )
    },
    {
      path: path.shopOnlineCart,
      element: (
        <Suspense>
          <OnlineStoreLayout>
            <StoreOnlineCart />
          </OnlineStoreLayout>
        </Suspense>
      )
    },
    {
      path: path.shopOnlineCheckout,
      element: (
        <Suspense>
          <OnlineStoreLayout>
            <StoreOnlineCheckout />
          </OnlineStoreLayout>
        </Suspense>
      )
    },
    {
      path: '/add-sample',
      element: (
        <MainLayout>
          <AddSample />
        </MainLayout>
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
