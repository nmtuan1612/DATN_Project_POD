import UserModel from '../models/userModel.js'
import mongoose from 'mongoose'

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
  const data = req.body
  console.log(data)
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
