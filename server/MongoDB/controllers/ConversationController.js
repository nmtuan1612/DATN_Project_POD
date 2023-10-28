import mongoose from 'mongoose'
import conversationModel from '../Models/conversationModel.js'
import MessageModel from '../Models/messageModel.js'

export const createConversation = async (req, res) => {
  const { customer: customerId, store: storeId } = req.body
  console.log(req.body)
  try {
    const oldConversation = await conversationModel.find({
      // participants: req.body.author_ids
      customer: new mongoose.Types.ObjectId(customerId),
      store: new mongoose.Types.ObjectId(storeId)
    })
    console.log('oldConversation:', oldConversation)
    if (oldConversation.length) {
      res.status(200).json({ message: 'Get conversation successfully!', data: oldConversation[0] })
    } else {
      const newConversation = new conversationModel(req.body)

      const conversation = await newConversation.save()
      res.status(200).json({ message: 'New conversation created!', data: conversation })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllConversationsOfUser = async (req, res) => {
  const userId = req.params.id

  try {
    const conversations = await conversationModel
      .find({ customer: new mongoose.Types.ObjectId(userId) })
      .populate(['customer', 'store'])
      .sort({
        updatedAt: -1
      })
    const conversationList = []
    for (const conversation of conversations) {
      // Find the latest message for the conversation
      const newestMessage = await MessageModel.findOne({
        conversationId: conversation._id
      }).sort({ created_time: -1 })

      // Add the latest message as a field to the conversation
      if (newestMessage) {
        const conversationWithNewestMessage = {
          ...conversation._doc,
          newestMessage: newestMessage
        }
        conversationList.push(conversationWithNewestMessage)
      }
    }
    res.status(200).json({ message: 'All conversations', data: conversationList })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllConversationsOfStore = async (req, res) => {
  const storeId = req.params.id

  try {
    const conversations = await conversationModel
      .find({ store: new mongoose.Types.ObjectId(storeId) })
      .populate(['customer', 'store'])
      .sort({
        updatedAt: -1
      })
    const conversationList = []
    for (const conversation of conversations) {
      // Find the latest message for the conversation
      const newestMessage = await MessageModel.findOne({
        conversationId: conversation._id
      }).sort({ created_time: -1 })

      // Add the latest message as a field to the conversation
      if (newestMessage) {
        const conversationWithNewestMessage = {
          ...conversation._doc,
          newestMessage: newestMessage
        }
        conversationList.push(conversationWithNewestMessage)
      }
    }
    res.status(200).json({ message: 'All conversations', data: conversationList })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createMessage = async (req, res) => {
  const newMessage = new MessageModel(req.body)
  try {
    const message = await newMessage.save()
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllMessageOfChat = async (req, res) => {
  const conversationId = req.params.id

  try {
    const chatMessages = await MessageModel.find({ conversationId }).sort({
      createdAt: 1
    })
    res.status(200).json(chatMessages)
  } catch (error) {
    res.status(500).json(error)
  }
}
