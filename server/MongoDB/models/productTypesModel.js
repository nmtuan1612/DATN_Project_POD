import mongoose from 'mongoose'

const ProductTypeSchema = mongoose.Schema({
  name: {
    type: String
    // required: true
  },
  categoryIds: {
    type: Array(String)
    // required: true
  }
})

const ProductTypeModel = mongoose.model('sample_types', ProductTypeSchema)
export default ProductTypeModel
