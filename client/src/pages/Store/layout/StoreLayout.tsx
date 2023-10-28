import React, { useContext, useEffect } from 'react'
import StoreSideNav from '../components/StoreSideNav/StoreSideNav'
import { Outlet, useMatch, useParams } from 'react-router-dom'
import StoreTopNav from '../components/StoreTopNav/StoreTopNav'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from 'src/config/motion'
import path from 'src/config/path'
import { useQuery } from '@tanstack/react-query'
import storeApi from 'src/apis/store.api'
import { Store } from 'src/types/store.type'
import { AppContext } from 'src/context/app.context'

type Props = {}

const StoreLayout = (props: Props) => {
  const { currentStore, setCurrentStore } = useContext(AppContext)
  const matchStoreProductDetailPage = useMatch(path.shopProductDetail)

  const matchProductDetail = useMatch(path.shopProductDetail)
  const matchOrderDetail = useMatch(path.shopOrderDetail)
  const { shopId } = useParams()

  const { data: storeData } = useQuery({
    queryKey: ['store', shopId || currentStore?._id],
    queryFn: () => storeApi.getStoreWithId({ id: shopId || (currentStore?._id as string) }),
    // queryFn: !matchStoreProductDetailPage ? () => storeApi.getStoreWithId({ id: shopId || currentStore?._id as string }) : undefined,
    staleTime: 2 * (60 * 1000)
  })
  const store: Store = storeData?.data?.data

  useEffect(() => {
    if (store) {
      setCurrentStore(store)
    }
  }, [store])

  return (
    <AnimatePresence>
      <motion.section
        {...fadeAnimation}
        className='container grid h-full flex-1 grid-cols-1 gap-6 py-10 text-gray-600 md:grid-cols-12 lg:grid-cols-10'
      >
        {/* <div className=''> */}
        <motion.div {...slideAnimation('left')} className='border-r md:col-span-3 lg:col-span-2'>
          <StoreSideNav />
        </motion.div>
        <div className='flex flex-col md:col-span-9 lg:col-span-8'>
          {!matchOrderDetail && !matchProductDetail ? (
            <motion.div {...slideAnimation('down')} className='mb-8'>
              <StoreTopNav />
            </motion.div>
          ) : (
            <></>
          )}
          <div className='flex-1 overflow-y-scroll'>
            <Outlet />
          </div>
        </div>
        {/* </div> */}
      </motion.section>
    </AnimatePresence>
  )
}

export default StoreLayout
