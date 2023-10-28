import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import { CustomButton } from 'src/components'
import Tooltip from 'src/components/Tooltip/Tooltip'
import { AppUrls } from 'src/config/config'
import { OrderStatus } from 'src/config/constants'
import { Order } from 'src/types/order.type'
import { Product } from 'src/types/product.type'
import { isAxiosError } from 'src/utils/utils'

type Props = {
  order: Order
  selected: string[]
  refetch: any
  setListIds: React.Dispatch<React.SetStateAction<string[]>>
  handleSelectProduct: (id: string) => void
}

type UpdateParams = {
  productId: string
  body: any
}

const StoreOrderCard = ({ order, selected, refetch, setListIds, handleSelectProduct }: Props) => {
  const { shopId } = useParams()

  const storeProductMutation = useMutation({
    mutationFn: (data: UpdateParams) => productApi.updateStoreProduct(data.productId, data.body)
  })

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
    <Link
      to={AppUrls.shopOrderDetail(shopId as string, order._id)}
      className='group grid grid-cols-12 gap-6 rounded-none border border-t-0 px-6 py-6 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md'
    >
      <div className='col-span-4 flex items-center gap-4'>
        <input
          id='term-checkbox'
          type='checkbox'
          checked={selected.includes(order._id)}
          onChange={() => handleSelectProduct(order._id)}
          className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
        />

        {/* <div className='flex-1'> */}
        <p className='line-clamp-1 font-medium text-gray-800 group-hover:text-primary'>#{order._id}</p>
        {/* </div> */}
      </div>
      <div className='col-span-2 flex items-center'>{order.customerId.fullName}</div>
      <div className='col-span-2 flex items-center'>{`USD ${order.totalBill}`}</div>
      <div className='col-span-2 flex items-center'>
        <div className='rounded border border-gray-500 bg-gray-50 px-2 py-0.5 text-sm capitalize text-gray-500'>
          {order.tracking}
        </div>
        {/* <div className=''>
          {order.status === 'created' ? (
            <CustomButton
              type='outline'
              title='UnPublish'
              disabled={storeProductMutation.isLoading}
              customStyles='px-4 py-[4px] md:px-4 md:py-[4px] bg-gray-100 hover:text-white hover:bg-primary hover:opacity-100'
              handleClick={() => handleChangeProductStatus({ productId: order._id, body: { status: 'unpublished' } })}
            />
          ) : (
            <CustomButton
              type='filled'
              title='Publish'
              disabled={storeProductMutation.isLoading}
              customStyles='px-4 py-[4px] md:px-4 md:py-[4px]'
              handleClick={() => handleChangeProductStatus({ productId: order._id, body: { status: 'published' } })}
            />
          )}
        </div> */}
      </div>
      <div className='col-span-2 flex items-center gap-2'>
        <div className='h-4 w-4 rounded-full border-2 border-purple-200 bg-primary' />
        <div className='text-gray-800'>{getOrderStatus(order.status)}</div>
      </div>
    </Link>
  )
}

export default StoreOrderCard
