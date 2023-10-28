import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import storeApi from 'src/apis/store.api'
import { CustomButton } from 'src/components'
import Loading from 'src/components/Loading/Loading'
import OrderStatusBar from 'src/components/OrderStatusBar/OrderStatusBar'
import { AppUrls } from 'src/config/config'
import { Order, OrderDetail, OrderItem } from 'src/types/order.type'

type Props = {}

const StoreOrderDetail = (props: Props) => {
  const { shopId, orderId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['order_detail', orderId],
    queryFn: () => storeApi.getOrderDetail(shopId as string, orderId as string),
    staleTime: 20 * 1000
  })
  const order: OrderDetail = data?.data?.data

  const productionCost = useMemo(
    () =>
      order && order?.items.length
        ? order.items
            .reduce((total: number, product: OrderItem) => {
              return (total += product.variant.productionCost * product.quantity)
            }, 0)
            .toFixed(2)
        : 0,
    [order]
  )

  return (
    <div className='flex flex-col gap-4'>
      <div className=''>
        <Link to={AppUrls.shopManageOrder(shopId as string)} className='button__link w-fit cursor-pointer text-sm'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
            <path
              fillRule='evenodd'
              d='M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z'
              clipRule='evenodd'
            />
          </svg>
          Orders
        </Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : order ? (
        <div className=''>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='text-gray-600'>
              <h2 className='tab__title'>Order ID:</h2>
              <h3 className='text-xl font-semibold'>{`#${order._id}`}</h3>
              <p className='text-sm text-gray-500'>Created {moment(order.createdAt).format('lll')}</p>
            </div>

            <div className='flex items-center gap-4'>
              <button className='flex items-center gap-3 rounded-lg px-3 py-1 font-medium text-red-500 hover:bg-gray-200 focus:outline-none md:py-1.5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-[22px] w-[22px]'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                    clipRule='evenodd'
                  />
                </svg>
                Cancel order
              </button>
              <CustomButton type='filled' title='Submit' />
            </div>
          </div>

          {/* Status */}
          <div className='mt-6'>
            <OrderStatusBar status={order.status} />
          </div>

          {/* Body */}
          <div className='mt-6 grid grid-cols-12 gap-6'>
            {/* detail */}
            <div className='col-span-12 md:col-span-8'>
              <div className='rounded-md border shadow-sm'>
                {/* list products */}
                <div className='border-b p-6'>
                  {order.items?.length &&
                    order.items.map((product: OrderItem) => (
                      <div key={product._id} className='flex justify-between gap-4 rounded-md pb-4'>
                        <div className='flex-1'>
                          <h4 className='mb-2 line-clamp-1 text-[18px] font-bold'>{product.variant.productId.name}</h4>
                          <div className='line-clamp-1 text-sm italic text-gray-500'>
                            <span>{`SKU ${product.variant.sku.split('-')[0]} `}</span>
                            <span className="before:px-2 before:font-black before:content-['\b7']">
                              {`Size ${product.variant.size}`}
                            </span>
                          </div>
                          <h5 className='mt-2 text-sm'>{`Printed by Printvana`}</h5>
                        </div>
                        <div className='relative h-fit rounded-md border'>
                          <img src={product.variant.productId.image} alt='' className='h16 w-16 object-cover' />
                          <div className='absolute -bottom-1 -left-1 rounded-sm bg-slate-500 px-1 text-xs text-white'>
                            {product.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className='p-6'>
                  <div className='mb-2 flex items-center justify-between'>
                    <h5 className='text-sm'>Retail price</h5>
                    <span className='tracking-wider'>
                      USD {(Number(order.totalBill) - Number(order.shippingCost)).toFixed(2)}
                    </span>
                  </div>
                  <div className='mb-2 flex items-center justify-between'>
                    <h5 className='text-sm'>Production cost</h5>
                    <span className='tracking-wider'>USD {productionCost}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <h5 className='text-sm'>Tracking details</h5>
                    <div className='rounded border border-gray-500 bg-gray-50 px-2 py-0.5 text-sm capitalize text-gray-500'>
                      Waiting for fulfillment
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className='col-span-12 md:col-span-4'>
              {/* Customer */}
              <div className='rounded-md border shadow-sm'>
                <div className='border-b px-6 py-2'>
                  <h3 className='text-xl font-bold'>Customer</h3>
                </div>
                <div className='border-b p-6'>
                  <h4 className='mb-2 font-bold'>Contact details</h4>
                  <p className='mb-1'>{order.purchaseInfo.fullName}</p>
                  <p className='mb-1'>{order.purchaseInfo.phoneNumber}</p>
                </div>

                <div className='p-6'>
                  <h4 className='mb-2 font-bold'>Shipping address</h4>
                  <p className='mb-1 capitalize'>{`${order.purchaseInfo.addressDetail},`}</p>
                  <p className='mb-1 capitalize'>{`${order.purchaseInfo.ward} ward,`}</p>
                  <p className='mb-1 capitalize'>{`${order.purchaseInfo.district} district,`}</p>
                  <p className='mb-1 capitalize'>{`${order.purchaseInfo.province}, ${order.purchaseInfo.country}`}</p>
                </div>
              </div>

              {/* Billing */}
              <div className='mt-6 rounded-md border shadow-sm'>
                <div className='border-b px-6 py-2'>
                  <h3 className='text-xl font-bold'>Billing</h3>
                </div>
                <div className='flex items-center justify-between border-b px-6 py-4'>
                  <h4 className=''>Retail price</h4>
                  <span className=''>USD {(Number(order.totalBill) - Number(order.shippingCost)).toFixed(2)}</span>
                </div>
                <div className='border-b px-6 py-4'>
                  <div className='flex items-center justify-between'>
                    <h4 className=''>Production cost</h4>
                    <span className='tracking-wider'>USD {productionCost}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <h4 className=''>Shipping</h4>
                    <span className='tracking-wider'>USD {order.shippingCost}</span>
                  </div>
                </div>
                <div className='flex items-center justify-between border-b px-6 py-4'>
                  <h4 className=''>Total cost</h4>
                  <span className='tracking-wider'>USD {order.totalBill}</span>
                </div>
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

export default StoreOrderDetail
