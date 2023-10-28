import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { isEqual, omit } from 'lodash'
import React, { useMemo, useState } from 'react'
import { Link, createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import storeApi from 'src/apis/store.api'
import InputSearch from 'src/components/InputSearch/InputSearch'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import { OrderStatus } from 'src/config/constants'
import { slideAnimation } from 'src/config/motion'
import useOrderQueryConfig from 'src/hooks/useOrderQueryConfig'
import { Order, StoreOrderListConfig } from 'src/types/order.type'
import { Product } from 'src/types/product.type'
import StoreOrderCard from '../../components/StoreOrderCard/StoreOrderCard'

type Props = {}

const StoreManageOrders = (props: Props) => {
  const queryConfig = useOrderQueryConfig()

  const [selected, setSelected] = useState<string[]>([])
  const [listIds, setListIds] = useState<string[]>([])

  const { shopId } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['store_orders', shopId, queryConfig],
    queryFn: () => storeApi.getStoreOrders(shopId as string, queryConfig as StoreOrderListConfig),
    staleTime: 20 * 1000
  })

  const ordersList = data?.data?.data

  const allOrderIds = useMemo(() => {
    return ordersList ? ordersList?.map((product: Product) => product._id) : []
  }, [ordersList])

  const isSelectedAll = isEqual(selected, allOrderIds)

  const handleSelectProduct = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(allOrderIds)
    } else setSelected([])
  }

  return (
    <AnimatePresence>
      <motion.section {...slideAnimation('right')}>
        {/* Header */}
        <div className=''>
          <InputSearch placeholder='Search order by id' pathname={pathname} queryConfig={queryConfig} />
        </div>
        {/* filters */}
        <div className='mt-6 flex items-center gap-2.5'>
          <Link
            to={{ pathname, search: createSearchParams(omit(queryConfig, 'status')).toString() }}
            className={classNames('block rounded-lg border px-4 py-1', {
              'border-gray-300 bg-gray-50 hover:bg-gray-200': queryConfig.status,
              'border-purple-500 bg-primary text-white hover:bg-purple-500': !queryConfig.status
            })}
          >
            All
          </Link>
          {OrderStatus.map((status) => (
            <Link
              key={status.id}
              to={{ pathname, search: createSearchParams({ ...queryConfig, status: status.id }).toString() }}
              className={classNames('block rounded-lg border px-4 py-1', {
                'border-gray-300 bg-gray-50 hover:bg-gray-200': queryConfig.status !== status.id,
                'border-purple-500 bg-primary text-white hover:bg-purple-500': queryConfig.status === status.id
              })}
            >
              {status.name}
            </Link>
          ))}
        </div>

        {/* Selected and filters */}
        <div className='mt-8 grid grid-cols-12 gap-6 border px-6 py-4'>
          <div className='col-span-4 flex items-center gap-4'>
            <input
              id='term-checkbox'
              type='checkbox'
              disabled={!ordersList?.length}
              checked={isSelectedAll}
              onChange={(event) => handleSelectAll(event)}
              className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
            />
            <h4 className='text-sm font-medium text-gray-900'>Order</h4>
          </div>
          <div className='col-span-2 flex items-center'>
            <h4 className='text-sm font-medium text-gray-900'>Customer</h4>
          </div>
          <div className='col-span-2 flex items-center'>
            <h4 className='text-sm font-medium text-gray-900'>Total cost</h4>
          </div>
          <div className='col-span-2 flex items-center'>
            <h4 className='text-sm font-medium text-gray-900'>Tracking</h4>
          </div>
          <div className='col-span-2 flex items-center'>
            <h4 className='text-sm font-medium text-gray-900'>Status</h4>
          </div>
        </div>

        {/* ordersList list */}
        {isLoading ? (
          <div role='status' className='mt-2 flex animate-pulse flex-col gap-5 rounded'>
            {Array(3)
              .fill('skeleton')
              .map((item, idx) => (
                <div
                  key={item + idx}
                  className='flex items-center justify-between gap-2 rounded-lg p-6 pr-8 shadow-around'
                >
                  {/* <div className='h-12 w-12 rounded-full bg-gray-300' /> */}
                  <div className='flex-1'>
                    <div className='h-6 rounded-lg bg-gray-300' />
                    <div className='mt-1 h-4 w-[50%] rounded-lg bg-gray-200' />
                  </div>
                </div>
              ))}
          </div>
        ) : ordersList?.length ? (
          <ul className='mt-0 flex flex-col gap-0'>
            {ordersList.map((order: Order) => (
              // product item
              <li
                // to={AppUrls.shopProductDetail(product._id)}
                key={order._id}
              >
                <StoreOrderCard
                  order={order}
                  selected={selected}
                  refetch={refetch}
                  setListIds={setListIds}
                  handleSelectProduct={handleSelectProduct}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ProductsListEmpty title='No order found!' />
        )}
      </motion.section>
    </AnimatePresence>
  )
}

export default StoreManageOrders
