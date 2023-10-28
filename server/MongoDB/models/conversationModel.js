import mongoose from 'mongoose'

const conversationSchema = mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    updated_time: { type: String }
  },
  { timestamps: true }
)

const conversationModel = mongoose.model('Conversation', conversationSchema)
export default conversationModel
