import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import chatApi from 'src/apis/chat.api'
import userApi from 'src/apis/user.api'
import ConversationsList from 'src/components/Messenger/ConversationsList'
import ChatBox from 'src/components/Messenger/components/ChatBox/ChatBox'
import { slideAnimation } from 'src/config/motion'
import { AppContext } from 'src/context/app.context'
import { ConversationDetail } from 'src/types/chat.type'
import { User } from 'src/types/user.type'

type Props = {}

const StoreManageChat = (props: Props) => {
  const {
    currentStore,
    chatMetaData: { otherUserId }
  } = useContext(AppContext)

  const { shopId: storeId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['get_all_store_conversations', storeId],
    queryFn: () => chatApi.getAllStoreConversations(storeId as string),
    enabled: Boolean(storeId)
  })
  const conversations: ConversationDetail[] = data?.data?.data

  const { data: user } = useQuery({
    queryKey: ['get_user_by_id', otherUserId],
    queryFn: () => userApi.getUser({ id: otherUserId }),
    enabled: Boolean(otherUserId)
  })
  const otherUser: User = user?.data

  return (
    <AnimatePresence>
      <motion.div
        {...slideAnimation('right')}
        className='flex h-full flex-col overflow-hidden rounded-md border bg-white shadow-around'
      >
        <div className='grid flex-1 grid-cols-12'>
          <div className='col-span-4 '>
            <ConversationsList type='store' isLoading={isLoading} conversations={conversations} />
          </div>

          <div className='col-span-8 border'>
            <ChatBox sender={currentStore?.storeName as string} otherUser={otherUser} senderId={storeId as string} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default StoreManageChat
