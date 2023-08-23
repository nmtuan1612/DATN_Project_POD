export interface Store {
  _id: string
  ownerId: string
  storeName: string
  logo?: string
  storeDescription: string
  isActive: boolean
  //   store_address: {
  //     type: String,
  //     required: true,
  //   },
  products?: string[] // [ObjectId("product_id")]
  orders?: string[] //[ObjectId
  createdAt: string
  updatedAt: string
}
