const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  helpAndSupport: '/help',
  userDetail: '/user/detail',
  userSetting: '/user/setting',
  userStores: '/user/my-stores',
  userOrders: '/user/orders',
  userOrderDetail: '/user/order/:orderId',
  // shop
  shop: '/shops',
  createShop: '/shop/create',
  shopDetail: '/shop/:shopId',
  shopSetting: '/shop/:shopId/setting',
  shopManageProduct: '/shop/:shopId/products',
  shopManageOrder: '/shop/:shopId/orders',
  shopOrderDetail: '/shop/:shopId/order/:orderId',
  shopEditOrder: '/shop/edit-order/:orderId',
  // product
  categoryProduct: '/category/:categoryId',
  productDetail: '/products/:productId',
  editProduct: '/products/editor/:productId',
  // Chat
  shopChats: '/shop/:shopId/chats',
  userChats: '/user/:userId/chats',
  chatDetail: '/chats/:chatId'
} as const

export default path
