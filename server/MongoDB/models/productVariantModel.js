import mongoose from 'mongoose'

export const ProductVariantSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StoreProducts',
      required: true
    },
    sku: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    // title: {
    //   type: String,
    //   required: true,
    // },
    // images: {
    //   type: String,
    //   required: true,
    // },
    inventory: {
      type: String,
      required: true
    },
    retailPrice: {
      type: Number,
      required: true
    },
    profit: {
      type: Number,
      required: true
    },
    profitMargin: {
      type: Number,
      required: true
    },
    productionCost: {
      type: Number,
      required: true
    },
    shippingCost: {
      type: Number,
      required: true
    },
    isPublished: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)

const ProductVariantModel = mongoose.model('Product_Variants', ProductVariantSchema)
export default ProductVariantModel
