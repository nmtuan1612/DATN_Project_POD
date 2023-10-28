import mongoose from 'mongoose'

const SampleProductSchema = mongoose.Schema(
  {
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
    image: {
      type: String,
      required: true
    },
    otherImages: Array(String),
    typeId: {
      type: String,
      required: true
    },
    hiddenTag: String,
    sizeGuides: {
      sizes: Array(String),
      types: Array(Object)
    }

    // variants: Array(String) // list variant ids
  },
  { timestamps: true }
)

const SampleProductModel = mongoose.model('SampleProduct', SampleProductSchema)
export default SampleProductModel
