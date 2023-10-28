import mongoose from 'mongoose'
import ProductVariantModel from '../models/productVariantModel.js'
import StoreProductModel from '../models/storeProductModel.js'

export const addProductVariants = async (req, res) => {
  const { variants } = req.body
  try {
    // console.log(req.body)
    if (variants.length) {
      const variantsData = variants.map((variant) => ({
        ...variant,
        productId: new mongoose.Types.ObjectId(variant.productId)
      }))
      const response = await ProductVariantModel.insertMany(variantsData)
      res.status(200).json({ message: 'Variants created', data: response })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getListProductVariants = async (req, res) => {
  const { listIds } = req.query
  try {
    if (listIds.length) {
      const variants = await ProductVariantModel.find({
        _id: { $in: listIds.map((id) => new mongoose.Types.ObjectId(id)) }
      }).populate('productId', 'name image description')

      // const data = []
      // for (const variant of variants) {
      //   const product = await StoreProductModel.findOne(
      //     { _id: new mongoose.Types.ObjectId(variant.productId) },
      //     'name image description'
      //   )
      //   const result = {
      //     ...variant._doc,
      //     productName: product.name,
      //     productImage: product.image,
      //     description: product.description
      //   }
      //   data.push(result)
      // }
      res.status(200).json({ message: 'Variants list founded!', data: variants })
    } else {
      // res.status(404).json('Variants not found!')
      res.status(200).json({ data: [] })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateProductVariants = async (req, res) => {
  const { variants } = req.body
  try {
    if (variants.length) {
      for (const variant of variants) {
        // console.log(variant)
        await ProductVariantModel.findByIdAndUpdate(variant._id, variant, { new: true })
      }
      res.status(201).json('Variants updated successfully')
    } else {
      res.status(404).json('Variant not found!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
