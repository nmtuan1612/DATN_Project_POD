export const AppUrls = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  helpAndSupport: '/help',
  // userDetail: '/user/detail',
  userSetting: '/user/setting',
  userStores: '/user/my-stores',
  userOrders: '/user/my-orders',
  userOrderDetail: (orderId: string) => `/user/my-orders/${orderId}`,
  // shop
  shop: '/shop',
  createShop: '/create-shop',
  shopOnlineDetail: (shopId: string) => '/shop-online/' + shopId,
  shopOnlineProductDetail: (productId: string) => '/shop-online/products/' + productId,
  shopSetting: (shopId: string) => `/shop/${shopId}/setting`,
  shopManageProducts: (shopId: string) => `/shop/${shopId}/my-products`,
  shopManageOrder: (shopId: string) => `/shop/${shopId}/orders`,
  shopOrderDetail: (shopId: string, orderId: string) => `/shop/${shopId}/orders/${orderId}`,
  shopEditOrder: (orderId: string) => `/shop/edit-order/${orderId}`,
  shopProductDetail: (productId: string) => `/shop/my-products/${productId}`,
  // product
  categoryProduct: (categoryId: string) => `/category/${categoryId}`,
  categoryFeatured: (featureId: string) => `/category-featured/${featureId}`,
  productDetail: (productId: string) => `/products/${productId}`,
  customProduct: (productId: string) => `/editor/${productId}`,
  // editProduct: (productId: string) => `/products/details/${productId}`,
  // Chat
  shopChats: (shopId: string) => `/shop/${shopId}/chats`,
  userChats: (userId: string) => `/user/${userId}/chats`,
  chatDetail: (chatId: string) => `/chats/${chatId}`
} as const

const config = {
  development: {
    frontendUrl: 'http://localhost:5173',
    backendUrl: 'http://localhost:8080/api/v1'
    // frontendUrl: 'https://creoprint.netlify.app',
    // backendUrl: 'https://pod-creoprint.onrender.com/api/v1'
  },
  production: {
    backendUrl: 'https://pod-creoprint.onrender.com/api/v1'
  },
  maxSizeUploadAvatar: 1048576 // bytes
}

export default config
