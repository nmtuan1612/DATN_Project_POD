import express from 'express'
import { getUser, updateUser, getAllUserStore } from '../MongoDB/controllers/UserController.js'
import tokenMiddleWare from '../MiddleWare/VerifyAccessToken.js'
import { getUserOrderById, getUserOrders } from '../MongoDB/controllers/OrderController.js'

const UserRouter = express.Router()
UserRouter.get('/', getUser, tokenMiddleWare)
UserRouter.get('/my-stores', getAllUserStore, tokenMiddleWare)
UserRouter.get('/my-orders', getUserOrders, tokenMiddleWare)
UserRouter.get('/my-orders/:orderId', getUserOrderById, tokenMiddleWare)
UserRouter.put('/', updateUser, tokenMiddleWare)

export default UserRouter
