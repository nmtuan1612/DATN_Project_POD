import express from 'express'
import tokenMiddleWare from '../MiddleWare/VerifyAccessToken.js'
import { createStore, getStoreWithId, updateStore } from '../MongoDB/controllers/StoreController.js'

const StoreRouter = express.Router()

StoreRouter.get('/', getStoreWithId, tokenMiddleWare)
StoreRouter.post('/', createStore, tokenMiddleWare)
StoreRouter.put('/:id', updateStore, tokenMiddleWare)

export default StoreRouter
