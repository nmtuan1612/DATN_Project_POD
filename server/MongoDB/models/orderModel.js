import mongoose from 'mongoose'

let ItemSchema = mongoose.Schema({
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product_Variants',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.']
  }
})

let PurchaseInfoSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  addressDetail: {
    type: String,
    required: true
  }
})

const OrderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, // ObjectId("user_id")
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    }, // ObjectId("store_id")
    totalBill: {
      type: Number,
      required: true
    },
    shippingCost: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    tracking: {
      type: String,
      required: true
    },
    items: [ItemSchema],
    purchaseInfo: PurchaseInfoSchema
  },
  { timestamps: true }
)

const OrderModel = mongoose.model('Order', OrderSchema)
export default OrderModel
