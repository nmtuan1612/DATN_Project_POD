import express from 'express'
import tokenMiddleWare from '../MiddleWare/VerifyAccessToken.js'
import { createStore, getStoreWithId, updateStore } from '../MongoDB/controllers/StoreController.js'
import { createNewOrder, getShopOrderById, getStoreOrders } from '../MongoDB/controllers/OrderController.js'

const StoreRouter = express.Router()

StoreRouter.get('/', getStoreWithId, tokenMiddleWare)
StoreRouter.post('/', createStore, tokenMiddleWare)
StoreRouter.put('/:id', updateStore, tokenMiddleWare)

StoreRouter.post('/:shopId/orders', createNewOrder)
StoreRouter.get('/:shopId/orders', getStoreOrders)
StoreRouter.get('/:shopId/orders/:orderId', getShopOrderById)

export default StoreRouter
