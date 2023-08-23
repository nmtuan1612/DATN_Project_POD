import mongoose from 'mongoose'

const StoreSchema = mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true
    },
    storeName: {
      type: String,
      required: true
    },
    logo: String,
    storeDescription: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    //   store_address: {
    //     type: String,
    //     required: true,
    //   },
    products: {
      type: Array(String)
      // required: true
    }, // [ObjectId("product_id")]
    orders: {
      type: Array(String)
      // required: true
    } //[ObjectId("order_id")]
  },
  { timestamps: true }
)

const StoreModel = mongoose.model('Store', StoreSchema)
export default StoreModel
