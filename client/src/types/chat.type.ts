import { Store } from './store.type'
import { User } from './user.type'

export type ConversationType = 'store' | 'user'

export interface CreateConversationBody {
  customer: string
  store: string
  updated_time: string
}

export interface ConversationMetaData {
  chatID: string
  otherUserId: string
}

export interface Conversation {
  _id: string
  customer: string
  store: string
  updated_time: string
}

export interface ConversationDetail {
  _id: string
  customer: User
  store: Store
  newestMessage: Message
  updated_time: string
}

export interface Message {
  _id?: string
  conversationId: string
  sender: string
  senderId: string
  content: string
  created_time: string
}
