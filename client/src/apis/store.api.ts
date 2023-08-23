import path from 'src/config/path'
import http from 'src/utils/http'
import { StoreSchema } from 'src/utils/rules'

type BodyStore = Pick<StoreSchema, 'storeName' | 'storeDescription' | 'logo'> & { ownerId?: string; _id?: string }

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
  }
}

export default storeApi
