import { AppUrls } from 'src/config/config'
import path from 'src/config/path'
import http from 'src/utils/http'

type BodyUpdateAccount = any

const userApi = {
  getUser(params: { id: string }) {
    return http.get(path.user, { params })
  },
  updateAccount(body: BodyUpdateAccount) {
    return http.put(path.user, body)
  },
  getUserOrders(params: any) {
    return http.get(path.userOrders, { params })
  },
  getUserOrderDetail(orderId: string) {
    return http.get(AppUrls.userOrderDetail(orderId))
  }
}

export default userApi
