import path from 'src/config/path'
import { ProductListConfig } from 'src/types/product.type'
import http from 'src/utils/http'
import { StoreSchema } from 'src/utils/rules'
import { StoreOrderListConfig } from 'src/types/order.type'

type BodyStore = Pick<StoreSchema, 'storeName' | 'storeDescription' | 'logo'> & { ownerId?: string; _id?: string }

const URL_STORE = 'product/store-product'
const URL_ONLINE_STORE = 'product/online-product'

const storeApi = {
  getStoreWithId(params: { id: string }) {
    return http.get(path.shop, { params })
  },
  createStore(body: BodyStore) {
    return http.post(path.shop, body)
  },
  getUserStores(params: { id: string }) {
    return http.get(path.userStores, { params })
  },
  updateStore(storeId: string, body: BodyStore) {
    return http.put(`${path.shop}/${storeId}`, body)
  },
  // products
  getProductsOfStore(storeId: string, params: ProductListConfig) {
    return http.get(`${URL_STORE}/${storeId}`, { params })
  },
  getProductsCart(params: { listIds: string }) {
    return http.get('product/online-store/cart', { params })
  },

  // orders
  getStoreOrders(storeId: string, params: StoreOrderListConfig) {
    return http.get(`${path.shop}/${storeId}/orders`, { params })
  },
  getOrderDetail(storeId: string, orderId: string) {
    return http.get(`${path.shop}/${storeId}/orders/${orderId}`)
  },
  updateOrderStatus(body: any) {
    return http.put('/shop/orders', body)
  }

  // getPublishProductsOfOnlineStore(storeId: string, params: ProductListConfig) {
  //   return http.get(`${URL_ONLINE_STORE}/${storeId}`, { params })
  // }
}

export default storeApi
