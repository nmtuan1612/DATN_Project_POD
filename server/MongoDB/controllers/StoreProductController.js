import mongoose from 'mongoose'
import ThreeDModel from '../models/ThreeDModel.js'
import StoreProductModel from '../models/storeProductModel.js'
import ProductVariantModel from '../models/productVariantModel.js'

export const createNewProduct = async (req, res) => {
  const data = req.body
  try {
    if (data) {
      // const oldProduct = await StoreProductModel.findOne({
      //   name: data.name,
      //   storeId: new mongoose.Types.ObjectId(data.storeId)
      // })
      // if (oldProduct) {
      //   return res.status(400).send('This product already exists')
      // } else {
      // console.log({ ...data, storeId: new mongoose.Types.ObjectId(data.storeId) })
      const product = new StoreProductModel({ ...data, storeId: new mongoose.Types.ObjectId(data.storeId) })
      const newProduct = await product.save()
      res.status(201).json({ message: 'Product created successfully!', data: newProduct })
      // }
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getStoreProductWithId = async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      const product = await StoreProductModel.findById(id).populate('storeId')
      if (product) {
        const { modelId } = product?._doc
        const model = await ThreeDModel.findById(modelId)
        const variants = await ProductVariantModel.find({ productId: id })

        res.status(200).json({ data: { ...product._doc, modelMetaData: model._doc, variants: variants } })
      } else {
        res.status(404).json('Product not found')
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateStoreProduct = async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      if (req.body.name) {
        const oldProduct = await StoreProductModel.findOne({
          name: req.body.name,
          storeId: new mongoose.Types.ObjectId(req.body.storeId)
        })
        console.log(oldProduct._id.toString())
        if (oldProduct._id.toString() !== id) {
          return res.status(400).send('This product name already exists')
        }
      }
      const updatedProduct = await StoreProductModel.findByIdAndUpdate(id, req.body, { new: true })
      res.status(200).json({ message: 'Update product successfully!', data: updatedProduct })
    } else {
      res.status(404).json('Product not found')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateListStoreProducts = async (req, res) => {
  const { idsList, updateData } = req.body
  try {
    if (idsList) {
      const updatedProducts = await StoreProductModel.updateMany(
        { _id: { $in: idsList.map((id) => new mongoose.Types.ObjectId(id)) } },
        updateData,
        { upsert: false }
      )
      res.status(200).json({ message: 'Update product successfully!', data: updatedProducts })
    } else {
      res.status(404).json('List products not found')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteStoreProduct = async (req, res) => {
  const { idsList } = req.body
  try {
    if (idsList) {
      await StoreProductModel.deleteMany({ _id: { $in: idsList.map((id) => new mongoose.Types.ObjectId(id)) } })
      res.status(204).json('Products deleted!')
    }
    // res.status(204).json('Products deleted!')
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getProductsOfOnlineStore = async (req, res) => {
  const { storeId } = req.params
  const { status, categoryId, sortBy, searchKey } = req.query

  try {
    if (storeId) {
      let products = []
      const queryObj = {
        storeId: new mongoose.Types.ObjectId(storeId),
        status: status ? { $in: status.split(',') } : { $exists: true },
        categoryIds: categoryId || { $exists: true }
        // name: { $regex: searchKey, $options: 'i' }
      }
      if (searchKey) {
        queryObj.name = { $regex: searchKey, $options: 'i' }
      }
      switch (sortBy) {
        case 'popularity':
          products = await StoreProductModel.find(queryObj).sort({ sold: -1 })
          break
        case 'low_to_high':
          products = await StoreProductModel.find(queryObj).sort({ price: 1 })
          break
        case 'high_to_low':
          products = await StoreProductModel.find(queryObj).sort({ price: -1 })
          break
        default:
          products = await StoreProductModel.find(queryObj)
          break
      }
      res.status(200).json({ data: products })
    } else {
      res.status(200).json({ data: [] })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getProductsCart = async (req, res) => {
  const { listIds } = req.query
  // console.log(req.query)
  try {
    if (listIds) {
      const products = await StoreProductModel.find({
        _id: { $in: listIds.split(',').map((id) => new mongoose.Types.ObjectId(id.split('-')[0])) }
      })
      res.status(200).json({ data: products })
    } else {
      res.status(200).json({ data: [] })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// export const getProductsOfStore = async (req, res) => {
//   const { storeId } = req.params
//   const { status, searchKey } = req.query
//   console.log(searchKey)
//   try {
//     if (storeId) {
//       let products = []
//       // if (status) {
//       products = await StoreProductModel.find({
//         storeId: new mongoose.Types.ObjectId(storeId),
//         status: status ? { $in: status.split(',') } : { $exist: true },
//         name: { $regex: searchKey, $options: 'i' }
//       })
//       // } else {
//       //   products = await StoreProductModel.find({ storeId: storeId })
//       // }
//       res.status(200).json({ data: products })
//     } else {
//       res.status(200).json({ data: products })
//     }
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }
