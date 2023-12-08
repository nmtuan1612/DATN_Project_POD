import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import storeApi from 'src/apis/store.api'
import userApi from 'src/apis/user.api'
import { CustomButton } from 'src/components'
import Loading from 'src/components/Loading/Loading'
import ChatButton from 'src/components/Messenger/components/ChatButton/ChatButton'
import OrderStatusBar from 'src/components/OrderStatusBar/OrderStatusBar'
import OrderTracking from 'src/components/OrderTracking/OrderTracking'
import { AppUrls } from 'src/config/config'
import { OrderStatus } from 'src/config/constants'
import { OrderDetail, OrderItem } from 'src/types/order.type'
import { isAxiosError } from 'src/utils/utils'

type Props = {}

const UserOrderDetail = (props: Props) => {
  const { orderId } = useParams()

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['user_order_detail', orderId],
    queryFn: () => userApi.getUserOrderDetail(orderId as string),
    staleTime: 20 * 1000
  })
  const order: OrderDetail = data?.data?.data

  const orderMutation = useMutation({ mutationFn: (body: any) => storeApi.updateOrderStatus(body) })

  const handleCancel = async () => {
    // console.log('alo')
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

  return (
    <div className='flex flex-col gap-4'>
      {isLoading ? (
        <Loading />
      ) : order ? (
        <div className=''>
          {/* Header */}
          <div className='flex items-start justify-between'>
            <Link to={AppUrls.userOrders} className='button__link w-fit cursor-pointer text-sm'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
                <path
                  fillRule='evenodd'
                  d='M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z'
                  clipRule='evenodd'
                />
              </svg>
              Orders
            </Link>
            <div className='text-gray-600'>
              <h3 className='font-semibold'>{`Order ID: #${order._id}`}</h3>
              <p className='text-sm text-gray-500'>Created {moment(order.createdAt).format('lll')}</p>
            </div>
          </div>

          {order.status === OrderStatus[4].id ? (
            <div className='mt-6'>
              <h3 className='font-semibold text-red-500'>{OrderStatus[4].name}</h3>
              <p className='text-sm text-gray-500'>Created {moment(order.updatedAt).format('lll')}</p>
            </div>
          ) : (
            <>
              {/* Status */}
              <div className='mt-6'>
                <OrderStatusBar status={order.status} />
              </div>

              <div className='my-4 flex justify-end gap-2'>
                {order.status === OrderStatus[0].id && (
                  <CustomButton type='danger' title='Cancel order' handleClick={handleCancel} />
                )}
                {/* {order.status === OrderStatus[1].id ||
                  (order.status === OrderStatus[2].id && <CustomButton type='outline' title='Contact seller' />)} */}
                {order.status === OrderStatus[3].id && <CustomButton type='filled' title='Rate' />}
                <ChatButton type='user' size='medium' customerId={order.customerId._id} storeId={order.storeId._id} />
              </div>
            </>
          )}

          <div className='custom__border'></div>

          {/* Body */}
          <div className='mt-0'>
            {/* Address */}
            <h4 className='mb-2 mt-4 px-6 text-xl font-medium'>Delivery Address</h4>

            <div className='grid grid-cols-12'>
              <div className='col-span-12 py-2 md:col-span-4'>
                <div className='px-6'>
                  <p className='mb-2 text-gray-700'>{order.purchaseInfo.fullName}</p>

                  <p className='mb-1 text-xs'>{order.purchaseInfo.phoneNumber}</p>
                  <p className='mb-1 text-xs capitalize'>{`${order.purchaseInfo.addressDetail}, ${order.purchaseInfo.ward} ward, ${order.purchaseInfo.district} district, ${order.purchaseInfo.province}, ${order.purchaseInfo.country}`}</p>
                </div>
              </div>
              <div className='col-span-12 py-2 md:col-span-8'>
                <OrderTracking />
              </div>
            </div>

            {/* product list */}
            <div className='border-b bg-slate-50 px-6 pb-2 pt-4'>
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
                <p className='line-clamp-1 text-[18px] font-semibold text-gray-800'>{order.storeId?.storeName}</p>
                <ChatButton type='user' customerId={order.customerId._id} storeId={order.storeId._id} />
              </div>
            </div>

            <div className='bg-slate-50'>
              {order.items.map((product: OrderItem, index, array) => (
                <div
                  key={product._id}
                  className={classNames('mx-6 flex justify-between gap-4 py-2', {
                    'border-b': index < array.length - 1
                  })}
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
            </div>

            <div className='flex flex-col border-t bg-gray-50 px-6'>
              <div className='grid grid-cols-12 py-3'>
                <h4 className='col-span-7 text-right text-sm text-gray-500 md:col-span-9'>Merchandise Subtotal:</h4>
                <h2 className='col-span-5 text-right font-normal tracking-wide text-gray-800 md:col-span-3'>
                  ${(Number(order.totalBill) - Number(order.shippingCost)).toFixed(2)}
                </h2>
              </div>
              <div className='grid grid-cols-12 py-3'>
                <h4 className='col-span-7 text-right text-sm text-gray-500 md:col-span-9'>Shipping Fee:</h4>
                <h2 className='col-span-5 text-right font-normal tracking-wide text-gray-800 md:col-span-3'>
                  ${order.shippingCost}
                </h2>
              </div>
              <div className='grid grid-cols-12 py-3'>
                <h4 className='col-span-7 text-right text-sm text-gray-500 md:col-span-9'>Order Total:</h4>
                <h2 className='col-span-5 text-right text-2xl font-normal tracking-wide text-primary md:col-span-3'>
                  ${order.totalBill}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'Error'
      )}
    </div>
  )
}

export default UserOrderDetail
