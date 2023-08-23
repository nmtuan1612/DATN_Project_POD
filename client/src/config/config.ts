export const AppUrls = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  helpAndSupport: '/help',
  // userDetail: '/user/detail',
  userSetting: '/user/setting',
  userStores: '/user/my-stores',
  userOrders: '/user/orders',
  userOrderDetail: '/user/order/:orderId',
  // shop
  shop: '/shop',
  createShop: '/create-shop',
  shopDetail: (shopId: string) => '/shop-detail/' + shopId,
  shopSetting: (shopId: string) => `/shop/${shopId}/setting`,
  shopManageProducts: (shopId: string) => `/shop/${shopId}/my-products`,
  shopManageOrder: (shopId: string) => `/shop/${shopId}/orders`,
  shopOrderDetail: (shopId: string, orderId: string) => `/shop/${shopId}/order/${orderId}`,
  shopEditOrder: (orderId: string) => `/shop/edit-order/${orderId}`,
  // product
  categoryProduct: (categoryId: string) => `/category/${categoryId}`,
  productDetail: (productId: string) => `/products/${productId}`,
  editProduct: (productId: string) => `/products/editor/${productId}`,
  // Chat
  shopChats: (shopId: string) => `/shop/${shopId}/chats`,
  userChats: (userId: string) => `/user/${userId}/chats`,
  chatDetail: (chatId: string) => `/chats/${chatId}`
} as const

const config = {
  development: {
    // frontendUrl: 'http://localhost:5173',
    // backendUrl: 'http://localhost:8080/api/v1'
    frontendUrl: 'https://creoprint.netlify.app',
    backendUrl: 'https://pod-creoprint.onrender.com/api/v1'
  },
  production: {
    backendUrl: 'https://pod-creoprint.onrender.com/api/v1'
  },
  maxSizeUploadAvatar: 1048576 // bytes
}

export default config
