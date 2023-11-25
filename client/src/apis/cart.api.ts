import http from 'src/utils/http'
import { OrderBody } from '../types/order.type'
import { AppUrls } from 'src/config/config'

const orderApi = {
  createOrder(storeId: string, body: OrderBody) {
    return http.post(AppUrls.shopManageOrder(storeId), body)
  },
  checkoutStripe(body: any) {
    return http.post('/stripe/create-checkout-session', body)
  }
}

export default orderApi
