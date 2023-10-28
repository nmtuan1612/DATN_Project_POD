// import Skeleton from "@mui/material/Skeleton";
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { ConversationDetail, ConversationType } from 'src/types/chat.type'
import Conversation from './components/Conversation/Conversation'

type Props = {
  type: ConversationType
  isLoading: Boolean
  conversations: ConversationDetail[]
}
const ConversationsList = ({ type, conversations, isLoading }: Props) => {
  const { profile, setChatMetaData } = useContext(AppContext)

  const joinChat = (chatID: string, otherUserId: string) => {
    // await socket.emit("join_chat", 123);
    setChatMetaData({
      chatID,
      otherUserId
    })
  }

  return (
    <div className='h-full border px-2 py-1.5'>
      {isLoading ? (
        <div role='status' className='flex animate-pulse flex-col gap-2.5' style={{ width: 300 }}>
          {Array(2)
            .fill({})
            .map((_, idx) => (
              <div className='flex gap-2.5' key={idx}>
                <div className='pop__item-avt h-10 w-10 rounded-full bg-gray-300' />

                <div className='flex-1'>
                  <div className='h-5  w-[40%] rounded-lg bg-gray-300' />
                  <div className='mt-2 h-4 w-[90%] rounded-lg bg-gray-200' />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <>
          {conversations?.length ? (
            <div className='flex flex-col gap-2.5' id='message__list'>
              {conversations.map((conversation) => {
                // const otherUserId = conversation?.participants?.filter((id) => id !== profile?._id)[0]
                const otherUserId = type === 'store' ? conversation.customer._id : conversation.store._id

                return (
                  <div
                    style={{ color: 'var(--black)' }}
                    key={conversation?._id}
                    onClick={() => {
                      joinChat(conversation?._id, otherUserId)
                      // sizeState !== "desktop" && navigate("/messenger");
                      document.querySelectorAll('.bottom-nav__tab').forEach((node: any) => {
                        node.style.display = 'none'
                      })
                    }}
                  >
                    <Conversation type={type} conversationData={conversation} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='text-sm italic text-gray-400'>No conversation found.</div>
          )}
        </>
      )}
    </div>
  )
}

export default ConversationsList
