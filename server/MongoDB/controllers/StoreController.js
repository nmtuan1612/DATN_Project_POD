import { deleteFile } from '../../routes/UploadRoute.js'
import StoreModel from '../models/storeModel.js'

// Get store by id
export const getStoreWithId = async (req, res) => {
  const { id } = req.query
  try {
    const store = await StoreModel.findById(id)
    if (store) {
      return res.status(200).json({ data: store })
    } else {
      return res.status(404).json({ message: 'Store not found' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
// Create store
export const createStore = async (req, res) => {
  try {
    const oldStore = await StoreModel.findOne({ storeName: req.body.storeName })
    if (oldStore) {
      if (req.body.logo) {
        const logoUrl = req.body.logo.substring(req.body.logo.indexOf('POD')).split('.')[0]
        deleteFile(logoUrl)
      }
      return res.status(400).send('This store name already exists')
    } else {
      const store = new StoreModel({ ...req.body, isActive: true })
      const newStore = await store.save()

      return res.status(201).json({
        message: 'Store created successfully!',
        data: newStore
      })
    }
  } catch (error) {
    res.status(500).json('Create store failed!')
  }
}

// Update store
export const updateStore = async (req, res) => {
  const storeId = req.params.id
  try {
    const updatedStore = await StoreModel.findByIdAndUpdate(storeId, req.body, { new: true })
    if (updatedStore) {
      res.status(200).json({ data: updatedStore, message: 'Store updated successfully!' })
    } else {
      res.status(400).send('Update store failed!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
