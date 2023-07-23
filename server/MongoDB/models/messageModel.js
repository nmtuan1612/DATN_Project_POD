import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    conversationId: { type: String, required: true },
    sender: { type: String, required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    // created_time: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
