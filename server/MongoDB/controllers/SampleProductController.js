import mongoose from 'mongoose'
import ProductTypeModel from '../models/productTypesModel.js'
import SampleProductModel from '../models/sampleProductModel.js'
import ThreeDModel from '../models/ThreeDModel.js'

export const getTypes = async (req, res) => {
  try {
    const { category } = req.query
    if (category) {
      const types = await ProductTypeModel.find(category === 'all' ? {} : { categoryIds: category })
      res.status(200).json({ data: types })
    } else {
      res.status(404).json('Category not found!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const AddSampleProductToDB = async (req, res) => {
  try {
    const data = req.body
    const newSample = new SampleProductModel(data)
    await newSample.save()
    res.status(200).json('Created successfully')
    // console.log(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getListSampleProducts = async (req, res) => {
  const { page, limit, categoryId, ...otherQueries } = req.query
  // console.log(req.query)
  try {
    let products = []
    // if (Object.keys(otherQueries).length) {
    const { typeIds, hiddenTag } = otherQueries
    if (typeIds) {
      products = await SampleProductModel.find({ categoryIds: categoryId, typeId: { $in: typeIds.split(',') } })
      // }
    } else if (hiddenTag) {
      products = await SampleProductModel.find({ hiddenTag })
    } else {
      products = await SampleProductModel.find({ categoryIds: categoryId })
    }
    res.status(200).json({ data: products })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const searchSampleProducts = async (req, res) => {
  const { page, limit, typeIds, searchKey } = req.query
  // console.log(req.query)
  try {
    if (searchKey) {
      const products = await SampleProductModel.find({
        typeId: typeIds ? { $in: typeIds.split(',') } : { $exists: true },
        name: { $regex: searchKey, $options: 'i' }
      })
      res.status(200).json({ data: products })
    } else {
      res.status(200).json({ data: [] })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getSampleProductWithId = async (req, res) => {
  const { id } = req.params
  try {
    const product = await SampleProductModel.findById(id)
    if (product) {
      const { typeId, modelId } = product?._doc
      const type = await ProductTypeModel.findById(typeId)
      const model = await ThreeDModel.findById(modelId)
      res.status(200).json({ data: { ...product._doc, type: type._doc, modelMetaData: model._doc } })
    } else {
      res.status(404).json('Product not found')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getFeaturedProducts = async (req, res) => {}
