import jwt from 'jsonwebtoken'
import { verifyGoogleToken } from '../../utils/auth.js'
import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential)
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error
        })
      }

      const profile = verificationResponse?.payload

      const oldUser = await UserModel.findOne({ email: profile.email })
      const { password, ...otherDetails } = oldUser._doc

      if (!oldUser) {
        return res.status(400).json({
          message: 'You are not registered. Please sign up'
        })
      }
      res.status(200).json({
        message: 'Login was successful',
        user: oldUser,
        access_token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
          expiresIn: '1d'
        })
      })
    } else if (req.body.email) {
      const oldUser = await UserModel.findOne({ email: req.body.email })

      if (oldUser) {
        if (oldUser.password) {
          const validity = await bcrypt.compare(req.body.password, oldUser.password)

          if (!validity) {
            return res.status(400).json('Wrong password!')
          } else {
            const { password, ...otherDetails } = oldUser._doc
            return res.status(200).json({
              message: 'Login was successful',
              user: otherDetails,
              access_token: jwt.sign({ email: oldUser?.email }, process.env.JWT_SECRET, {
                expiresIn: '1d'
              })
            })
          }
        } else {
          return res.status(400).json("You haven't created password for this email!")
        }
      } else {
        return res.status(404).json('User does not exists!')
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error
    })
  }
}

export const register = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential)

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error
        })
      }

      const profile = verificationResponse?.payload
      const data = {
        fullName: profile.name,
        email: profile.email,
        password: '',
        phoneNumber: '',
        profilePicture: profile.picture,
        roles: ['USER'],
        listStore: [],
        cart: []
      }

      const oldUser = await UserModel.findOne({ email: profile.email })
      if (oldUser) {
        return res.status(400).json({ message: 'Email already registered!' })
      }

      const newUser = new UserModel(data)
      const user = await newUser.save()

      res.status(201).json({
        message: 'Signup was successful',
        user,
        access_token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
          expiresIn: '1d'
        })
      })
    } else if (req.body.email) {
      const oldUser = await UserModel.findOne({ email: req.body.email })
      if (oldUser) {
        return res.status(400).json({ message: 'Email already registered!' })
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new UserModel({
          email: req.body.email,
          password: hashedPassword,
          fullName: req.body.email.split('@')[0],
          phoneNumber: '',
          profilePicture: '',
          roles: ['USER'],
          listStore: [],
          cart: []
        })
        const user = await newUser.save()

        res.status(201).json({
          message: 'Signup was successful',
          user,
          access_token: jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
            expiresIn: '1d'
          })
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred. Registration failed.'
    })
  }
}
