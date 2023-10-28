import mongoose from 'mongoose'
import OrderModel from '../models/orderModel.js'
import { OrderStatus } from '../config/constants.js'

export const createNewOrder = async (req, res) => {
  try {
    const { customerId, storeId, items, ...details } = req.body
    const newOrder = await OrderModel({
      ...details,
      customerId: new mongoose.Types.ObjectId(customerId),
      storeId: new mongoose.Types.ObjectId(storeId),
      items: items.map((item) => ({
        quantity: item.quantity,
        variant: new mongoose.Types.ObjectId(item._id)
      })),
      status: OrderStatus[1].id,
      tracking: 'pending'
    })
    await newOrder.save()
    res.status(201).json({ message: 'Order created successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getUserOrders = async (req, res) => {
  const { userId } = req.query
  const { status } = req.query

  try {
    if (userId) {
      const orders = await OrderModel.find({
        customerId: new mongoose.Types.ObjectId(userId),
        status: status ? status : { $exists: true }
      }).populate([
        { path: 'storeId' },
        { path: 'customerId', select: 'fullName' },

        { path: 'items.variant', populate: { path: 'productId', select: 'name image description' } }
      ])
      return res.status(200).json({ message: 'List orders of user', data: orders })
    } else return res.status(404).json('User not found')
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getStoreOrders = async (req, res) => {
  const { shopId } = req.params
  const { status, keySearch } = req.query
  try {
    if (shopId) {
      const orders = await OrderModel.find({
        storeId: new mongoose.Types.ObjectId(shopId),
        status: status ? status : { $exists: true },
        _id: keySearch ? new mongoose.Types.ObjectId(keySearch) : { $exists: true }
      }).populate('customerId', 'fullName')
      return res.status(200).json({ message: 'List orders of store', data: orders })
    } else return res.status(404).json({ message: 'Store not found', data: [] })
  } catch (error) {
    // res.status(500).json(error)
    return res.status(200).json({ message: 'List orders of store', data: [] })

    // error.stack
  }
}

export const getShopOrderById = async (req, res) => {
  const { shopId, orderId } = req.params
  try {
    const order = await OrderModel.findOne({ _id: new mongoose.Types.ObjectId(orderId), storeId: shopId }).populate([
      { path: 'customerId' },
      { path: 'items.variant', populate: { path: 'productId', select: 'name image description' } }
    ])
    if (order) {
      return res.status(200).json({ message: 'Order details', data: order })
    } else {
      res.status(404).json('Order not found')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getUserOrderById = async (req, res) => {
  const { orderId } = req.params
  try {
    const order = await OrderModel.findOne({ _id: new mongoose.Types.ObjectId(orderId) }).populate([
      { path: 'customerId' },
      { path: 'storeId' },
      { path: 'items.variant', populate: { path: 'productId', select: 'name image description' } }
    ])
    if (order) {
      return res.status(200).json({ message: 'Order details', data: order })
    } else {
      res.status(404).json('Order not found')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
