const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  supportCenter: '/support',
  term: '/term',
  upload: '/upload',
  user: '/user',
  userDetail: '/user/detail',
  userSetting: '/user/setting',
  userStores: '/user/my-stores',
  userOrders: '/user/orders',
  userOrderDetail: '/user/order/:orderId',
  // shop
  createShop: '/create-shop',
  shopDetail: '/shop-detail/:shopId',
  shop: '/shop',
  shopSetting: '/shop/:shopId/setting',
  shopManageProducts: '/shop/:shopId/my-products',
  shopManageOrder: '/shop/:shopId/orders',
  shopOrderDetail: '/shop/:shopId/order/:orderId',
  shopEditOrder: '/shop/edit-order/:orderId',
  // product
  category: '/category',
  categoryProduct: '/category/:categoryId',
  products: '/products',
  productDetail: '/products/:productId',
  editProduct: '/products/editor/:productId',
  // Chat
  shopChats: '/shop/:shopId/chats',
  userChats: '/user/:userId/chats',
  chatDetail: '/chats/:chatId'
} as const

export default path
