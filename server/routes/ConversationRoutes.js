import express from 'express'
import {
  createConversation,
  createMessage,
  getAllConversationsOfStore,
  getAllConversationsOfUser,
  getAllMessageOfChat
} from '../MongoDB/controllers/ConversationController.js'

const ConversationRouter = express.Router()

ConversationRouter.get('/:id', getAllConversationsOfUser)
ConversationRouter.get('/store/:id', getAllConversationsOfStore)
ConversationRouter.post('/', createConversation)
ConversationRouter.post('/message', createMessage)
ConversationRouter.get('/message/:id', getAllMessageOfChat)

export default ConversationRouter
