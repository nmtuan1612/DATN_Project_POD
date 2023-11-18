import { Store } from '@reduxjs/toolkit'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import chatApi from 'src/apis/chat.api'
import storeApi from 'src/apis/store.api'
import { CustomButton } from 'src/components'
import ConversationsList from 'src/components/Messenger/ConversationsList'
import ChatBox from 'src/components/Messenger/components/ChatBox/ChatBox'
import { AppContext } from 'src/context/app.context'
import { ConversationDetail } from 'src/types/chat.type'

type Props = {}

const UserChats = (props: Props) => {
  const {
    profile,
    chatMetaData: { otherUserId }
  } = useContext(AppContext)

  const [openChat, setOpenChat] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['get_all_conversations', profile?._id],
    queryFn: () => chatApi.getAllConversations(profile?._id as string),
    enabled: Boolean(profile?._id)
  })
  const conversations: ConversationDetail[] = data?.data?.data

  const { data: store } = useQuery({
    queryKey: ['get_user_by_id', otherUserId],
    queryFn: () => storeApi.getStoreWithId({ id: otherUserId }),
    enabled: Boolean(otherUserId)
  })
  const otherUser: Store = store?.data?.data

  return (
    !isLoading && (
      <>
        {!openChat ? (
          <div className='fixed -bottom-1 right-2 z-20'>
            <div className='relative'>
              <CustomButton
                type='filled'
                size='large'
                title={
                  <>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-6 w-6'>
                      <path d='M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z' />
                      <path d='M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z' />
                    </svg>
                    Chat
                  </>
                }
                handleClick={() => setOpenChat(true)}
              />
              <div className='5 absolute -right-1 -top-1 rounded-lg border border-white bg-primary px-1.5 text-xs text-white'>
                {conversations?.length}
              </div>
            </div>
          </div>
        ) : (
          <div className='fixed bottom-0 right-2 z-50 h-[40%] max-h-[40%] max-w-full md:max-w-[60%] lg:max-w-[50%] xl:max-w-[45%]'>
            <div className='flex h-full flex-col overflow-hidden rounded-md border bg-white shadow-around'>
              <div className='flex items-center justify-between rounded-tl-md rounded-tr-md border py-2'>
                <div className='h4 px-3 text-[18px] font-medium text-primary'>Chat</div>
                {/* close btn */}
                <div
                  className='mx-3 cursor-pointer rounded-sm border border-gray-400 px-0.5 hover:bg-gray-200'
                  onClick={() => setOpenChat(false)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3.5 w-3.5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                  </svg>
                </div>
              </div>
              <div className='grid flex-1 grid-cols-12' style={{ height: 'calc(40vh - 45px)' }}>
                <div className='col-span-5 xl:col-span-4'>
                  <ConversationsList type='user' isLoading={isLoading} conversations={conversations} />
                </div>

                <div className='col-span-7 border xl:col-span-8'>
                  <ChatBox
                    otherUser={otherUser}
                    senderId={profile?._id as string}
                    sender={profile?.fullName as string}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  )
}

export default UserChats
