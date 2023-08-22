import express from 'express'
import { getUser, updateUser } from '../MongoDB/controllers/UserController.js'
import tokenMiddleWare from '../MiddleWare/VerifyAccessToken.js'

const UserRouter = express.Router()
UserRouter.get('/', getUser, tokenMiddleWare)
UserRouter.put('/', updateUser, tokenMiddleWare)

export default UserRouter
