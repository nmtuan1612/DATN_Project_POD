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
    const { typeIds, hiddenTag, sortBy } = otherQueries
    let queryObj = { categoryIds: categoryId }
    if (typeIds) {
      queryObj.typeId = { $in: typeIds.split(',') }
      // }
    }
    if (hiddenTag) {
      queryObj = { hiddenTag }
    }
    // else {
    //   products = await SampleProductModel.find({ categoryIds: categoryId })
    // }
    switch (sortBy) {
      case 'popularity':
        products = await SampleProductModel.find(queryObj)
        break
      case 'low_to_high':
        products = await SampleProductModel.find(queryObj).sort({ price: 1 })
        break
      case 'high_to_low':
        products = await SampleProductModel.find(queryObj).sort({ price: -1 })
        break
      default:
        products = await SampleProductModel.find(queryObj)
        break
    }
    res.status(200).json({ data: products })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const searchSampleProducts = async (req, res) => {
  const { page, limit, typeIds, searchKey, sortBy } = req.query
  // console.log(req.query)
  try {
    let products = []
    const queryObj = {}
    if (searchKey) {
      queryObj.typeId = typeIds ? { $in: typeIds.split(',') } : { $exists: true }
      queryObj.name = { $regex: searchKey, $options: 'i' }
      switch (sortBy) {
        case 'popularity':
          products = await SampleProductModel.find(queryObj)
          break
        case 'low_to_high':
          products = await SampleProductModel.find(queryObj).sort({ price: 1 })
          break
        case 'high_to_low':
          products = await SampleProductModel.find(queryObj).sort({ price: -1 })
          break
        default:
          products = await SampleProductModel.find(queryObj)
          break
      }
    }
    res.status(200).json({ data: products })
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

export const edit3DModelMesh = async (req, res) => {
  try {
    // const model = await ThreeDModel.findById('654a0dbec8a75b538750b3ac')
    const model = await ThreeDModel.findByIdAndUpdate(
      '654a0dbec8a75b538750b3ac',
      {
        modelUrl: 'https://res.cloudinary.com/duyb3dqsr/image/upload/v1699331384/POD_Model/hoodie.glb',
        groupScale: 1,
        logoPosition: [0, 0.04, 0.15],
        logoScale: 0.15,
        fullTexturePosition: [0, 0, 0],
        textureScale: 1,
        meshes: [
          { name: 'mesh_0', isMainMesh: true },
          { name: 'mesh_0_1', isMainMesh: true },
          { name: 'mesh_0_2', isMainMesh: true },
          { name: 'mesh_0_3', isMainMesh: true },
          { name: 'mesh_0_4', isMainMesh: true },
          { name: 'mesh_0_5', isMainMesh: true },
          { name: 'mesh_0_6', isMainMesh: true },
          { name: 'mesh_0_7', isMainMesh: true },
          { name: 'mesh_0_8', isMainMesh: true },
          { name: 'mesh_0_9', isMainMesh: true },
          { name: 'mesh_0_10', isMainMesh: true },
          { name: 'mesh_0_11', isMainMesh: true },
          { name: 'mesh_0_12', isMainMesh: true },
          { name: 'mesh_0_13', isMainMesh: true },
          { name: 'mesh_0_14', isMainMesh: true },
          { name: 'mesh_0_15', isMainMesh: true },
          { name: 'mesh_0_16', isMainMesh: true },
          { name: 'mesh_0_17', isMainMesh: true },
          { name: 'mesh_0_18', isMainMesh: true },
          { name: 'mesh_0_19', isMainMesh: true },
          { name: 'mesh_0_20', isMainMesh: true },
          { name: 'mesh_0_21', isMainMesh: true },
          { name: 'mesh_0_22', isMainMesh: true },
          { name: 'mesh_0_23', isMainMesh: true }
        ]
      },
      { new: true }
    )
    console.log(model)
    res.status(200)
  } catch (error) {}
}
