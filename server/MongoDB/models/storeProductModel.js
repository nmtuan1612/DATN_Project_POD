import mongoose from 'mongoose'
import { ProductVariantSchema } from './productVariantModel.js'

const PrintOptions = mongoose.Schema({
  scale: Number,
  // position: 'left' || 'right' || 'center',
  // side: 'front' || 'back'
  position: String,
  side: String
})

const StoreProductSchema = mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    },
    categoryIds: {
      type: Array(String),
      required: true
    },
    name: {
      type: String,
      required: true
    },
    details: {
      type: Array(String),
      required: true
    },
    description: {
      type: String,
      required: true
    },
    printBrand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    modelId: {
      type: String,
      required: true
    },
    customMetadata: {
      color: String,
      logo: String,
      fullTexture: String,
      logoPrintOptions: PrintOptions,
      fullTexturePrintOptions: PrintOptions
    },
    printAreas: Array(String),
    image: {
      type: String,
      required: true
    },
    otherImages: Array(String),
    typeId: {
      type: String,
      required: true
    },
    sizeGuides: {
      sizes: Array(String),
      types: Array(Object)
    },
    status: String,
    hiddenTag: String,
    rating: Number,
    sold: Number,

    variants: Array(String) // list variant ids
  },
  { timestamps: true }
)

const StoreProductModel = mongoose.model('StoreProducts', StoreProductSchema, 'StoreProducts')
export default StoreProductModel
