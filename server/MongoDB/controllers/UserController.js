import UserModel from '../models/userModel.js'
import StoreModel from '../models/storeModel.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export const getUser = async (req, res) => {
  const id = req.query.id
  // console.log(req.query)

  try {
    const user = await UserModel.findById(new mongoose.Types.ObjectId(id))

    if (user) {
      const { password, ...otherDetails } = user._doc
      res.status(200).json(otherDetails)
    } else {
      res.status(404).json('No such user exists!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateUser = async (req, res) => {
  // const data = req.body
  // console.log(data)
  try {
    const user = await UserModel.findOneAndUpdate({ email: req.body.email }, req.body, { new: true })
    if (user) {
      const { password, ...otherDetails } = user._doc
      res.status(200).json({ data: otherDetails, message: 'User updated successfully!' })
    } else {
      res.status(404).json('Update user failed!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const resetPassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      await UserModel.findOneAndUpdate({ email: req.body.email }, { password: hashedPassword }, { new: true })
      res.status(200).send('Password updated successfully!')
    } else {
      res.status(404).json('Update user failed!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// Get my stores
export const getAllUserStore = async (req, res) => {
  const { id: ownerId } = req.query
  try {
    if (ownerId) {
      const stores = await StoreModel.find({ ownerId })
      return res.status(200).json({ data: stores, message: 'Get stores successfully' })
      // if (stores.length) {
      // } else {
      //   return res.status(404)
      // }
    } else {
      return res.status(404).json('User not found!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
