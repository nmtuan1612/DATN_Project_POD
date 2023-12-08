import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { isEqual, omit } from 'lodash'
import React, { useContext, useMemo, useState } from 'react'
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import userApi from 'src/apis/user.api'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import { OrderStatus } from 'src/config/constants'
import { slideAnimation } from 'src/config/motion'
import { AppContext } from 'src/context/app.context'
import useOrderQueryConfig from 'src/hooks/useOrderQueryConfig'
import { UserOrderDetail } from 'src/types/order.type'
import { Product } from 'src/types/product.type'
import OrderCard from '../../components/OrderCard/OrderCard'

type Props = {}

const ManageMyOrders = (props: Props) => {
  const { profile } = useContext(AppContext)
  const queryConfig = useOrderQueryConfig()

  const [selected, setSelected] = useState<string[]>([])
  const [listIds, setListIds] = useState<string[]>([])

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['my_orders', queryConfig],
    queryFn: () => userApi.getUserOrders({ userId: profile?._id as string, ...queryConfig }),
    staleTime: 20 * 1000
  })

  const ordersList = data?.data?.data

  const deleteProductMutation = useMutation({
    mutationFn: productApi.deleteStoreProduct
  })

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
          <ul className='mt-8 flex flex-col gap-0'>
            {ordersList.map((order: UserOrderDetail) => (
              // product item
              <li className='mb-2' key={order._id}>
                <OrderCard
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
          <ProductsListEmpty title={<>You don't have any orders. Let's shop!</>} />
        )}
      </motion.section>
    </AnimatePresence>
  )
}

export default ManageMyOrders
