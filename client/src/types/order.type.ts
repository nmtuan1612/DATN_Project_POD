import { PurchaseSchema } from 'src/utils/rules'
import { CartProductResponse, ProductCartItem, ProductVariant } from './product.type'
import { User } from './user.type'
import { Store } from 'src/types/store.type'

// type OrderStatus = 'created' | 'on hold' | 'shipped' | 'delivered'

export interface OrderBody {
  customerId: any // ObjectId("user_id")
  storeId: any // ObjectId("store_id")
  totalBill: number
  shippingCost: number
  status: string
  items: ProductCartItem[]
  purchaseInfo: PurchaseSchema
}

export interface Order extends OrderBody {
  _id: string
  tracking: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem extends ProductCartItem {
  variant: CartProductResponse
}

export interface OrderDetail extends Order {
  items: OrderItem[]
  customerId: User
}

export interface UserOrderDetail extends Order {
  items: OrderItem[]
  storeId: Store
  customerId: User
}

export interface StoreOrderListConfig {
  page?: number | string
  limit?: number | string
  status?: string
  keySearch?: string
}
