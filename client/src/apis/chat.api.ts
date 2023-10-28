import http from 'src/utils/http'
import { CreateConversationBody } from '../types/chat.type'

const chatApi = {
  createConversation(conversationData: CreateConversationBody) {
    return http.post('/conversation', conversationData)
  },
  getAllConversations(userId: string) {
    return http.get(`/conversation/${userId}`)
  },
  getAllStoreConversations(storeId: string) {
    return http.get(`/conversation/store/${storeId}`)
  },
  getAllMessageOfChat(chatID: string) {
    return http.get(`/conversation/message/${chatID}`)
  }
}

export default chatApi
