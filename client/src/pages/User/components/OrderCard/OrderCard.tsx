import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import storeApi from 'src/apis/store.api'
import { CustomButton } from 'src/components'
import ChatButton from 'src/components/Messenger/components/ChatButton/ChatButton'
import Tooltip from 'src/components/Tooltip/Tooltip'
import { AppUrls } from 'src/config/config'
import { OrderStatus, SHIPPING__FEE } from 'src/config/constants'
import { Order, OrderDetail, OrderItem, UserOrderDetail } from 'src/types/order.type'
import { Product } from 'src/types/product.type'
import { isAxiosError } from 'src/utils/utils'

type Props = {
  order: UserOrderDetail
  selected: string[]
  refetch: any
  setListIds: React.Dispatch<React.SetStateAction<string[]>>
  handleSelectProduct: (id: string) => void
}

type UpdateParams = {
  productId: string
  body: any
}

const OrderCard = ({ order, selected, refetch, setListIds, handleSelectProduct }: Props) => {
  const { shopId } = useParams()
  // console.log(order)
  const storeProductMutation = useMutation({
    mutationFn: (data: UpdateParams) => productApi.updateStoreProduct(data.productId, data.body)
  })

  const orderMutation = useMutation({ mutationFn: storeApi.updateOrderStatus })

  const handleCancel = async () => {
    console.log('alo')
    await orderMutation.mutateAsync(
      { orderId: order?._id, status: 'cancelled' },
      {
        onSuccess(data) {
          toast.error('Order cancelled', { autoClose: 1000 })
          refetch()
        },
        onError(error) {
          if (isAxiosError(error)) {
            toast.error((error.response?.data as string) || '')
          }
        }
      }
    )
  }

  const handleChangeProductStatus = async (data: UpdateParams) => {
    await storeProductMutation.mutateAsync(data, {
      onSuccess(data) {
        toast.success(`Product ${data.data?.data?.name} is ${data.data?.data?.status}!`, { autoClose: 1000 })
        refetch()
      },
      onError(error) {
        if (isAxiosError(error)) {
          toast.error((error.response?.data as string) || '')
        }
      }
    })
  }

  const getOrderStatus = (id: string) => {
    const status = OrderStatus.find((item) => item.id === id)
    return status?.name
  }

  return (
    <div className='group block overflow-hidden rounded-md border shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md'>
      <div className='flex justify-between gap-2 border-b px-6 pb-2 pt-4'>
        <div className='flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
            />
          </svg>
          <p className='line-clamp-1 text-[18px] font-semibold text-primary'>{order.storeId?.storeName}</p>
          <ChatButton type='user' customerId={order.customerId._id} storeId={order.storeId._id} />
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 rounded-full border-2 border-purple-200 bg-primary' />
          <div className='text-gray-800'>{getOrderStatus(order.status)}</div>
        </div>
      </div>
      <Link to={AppUrls.userOrderDetail(order._id as string)}>
        {order.items.map((product: OrderItem, index, array) => (
          <div
            key={product._id}
            className={classNames('mx-6 flex justify-between gap-4 py-2', { 'border-b': index < array.length - 1 })}
          >
            <div className='relative h-fit rounded-md border'>
              <img src={product.variant.productId.image} alt='' className='h16 w-16 object-cover' />
            </div>
            <div className='flex-1'>
              <h4 className='mb-2 line-clamp-1 font-medium'>{product.variant.productId.name}</h4>
              <div className='line-clamp-1 text-sm italic text-gray-500'>
                <span className=''>{`x${product.quantity}`}</span>
                <span className="before:px-2 before:font-black before:content-['\b7']">{`Variant: Size ${product.variant.size}`}</span>
              </div>
            </div>
            <div className='flex h-16 items-center text-gray-800'>${product.variant.retailPrice}</div>
          </div>
        ))}
      </Link>

      <div className='flex items-center justify-between gap-2 border-t bg-gray-50 px-6 py-4 pt-3'>
        {order.status === OrderStatus[0].id && (
          <CustomButton type='danger' title='Cancel order' handleClick={handleCancel} />
        )}
        {order.status === OrderStatus[1].id ||
          (order.status === OrderStatus[2].id && <CustomButton type='outline' title='Contact seller' />)}
        {order.status === OrderStatus[3].id && <CustomButton type='filled' title='Rate' />}
        <div className='flex items-center gap-4'>
          <h4 className='text-gray-800'>Order Total:</h4>
          <h2 className='text-2xl font-normal tracking-wide text-primary'>${order.totalBill + SHIPPING__FEE}</h2>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
