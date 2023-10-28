import classNames from 'classnames'
import moment from 'moment'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { ConversationDetail, ConversationType } from 'src/types/chat.type'

type Props = {
  type: ConversationType
  conversationData: ConversationDetail
}

const Conversation = (props: Props) => {
  const { type, conversationData } = props
  const {
    chatMetaData: { chatID }
  } = useContext(AppContext)

  return (
    <>
      {!conversationData ? (
        <>
          <div className='popover__item flex'>
            <div className='pop__item-avt h-[32px] w-[32px]' />

            <div className='pop__item-content'>
              <div className='h-5 rounded-md' />
              <div className='h-3 w-[50%] rounded-md' />
            </div>
          </div>
        </>
      ) : (
        <div
          className={classNames('flex cursor-pointer gap-2.5 rounded px-2 py-2.5 hover:bg-gray-100', {
            'bg-gray-200': chatID === conversationData._id
          })}
        >
          <div className='h-10 w-10 overflow-hidden rounded-full border'>
            {type === 'user' ? (
              <img
                src={
                  conversationData.store?.logo
                    ? conversationData.store.logo
                    : 'http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png'
                }
                alt='avt'
                className='h-full w-full object-cover'
              />
            ) : (
              <img
                src={
                  conversationData.customer.profilePicture
                    ? conversationData.customer.profilePicture
                    : 'http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png'
                }
                alt='avt'
                className='h-full w-full object-cover'
              />
            )}
          </div>
          <div className='flex flex-1 flex-col'>
            <span className='font-semibold '>
              {type === 'user' ? conversationData.store?.storeName : conversationData.customer.fullName}
            </span>
            <div className='flex text-sm text-gray-400'>
              <span className='line-clamp-1 max-w-[50%]'>{conversationData?.newestMessage?.content}</span>
              <span style={{ margin: '0 4px' }}> · </span>
              <span className='line-clamp-1 max-w-[50%]'>
                {moment(conversationData?.newestMessage?.created_time).fromNow(true)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Conversation
