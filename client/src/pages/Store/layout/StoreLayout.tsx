import React from 'react'
import StoreSideNav from '../components/StoreSideNav/StoreSideNav'
import { Outlet } from 'react-router-dom'
import StoreTopNav from '../components/StoreTopNav/StoreTopNav'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from 'src/config/motion'

type Props = {}

const StoreLayout = (props: Props) => {
  return (
    <AnimatePresence>
      <motion.section {...fadeAnimation} className='container h-full py-10 text-gray-600'>
        <div className='grid h-full grid-cols-1 gap-6 md:grid-cols-10'>
          <motion.div {...slideAnimation('left')} className='border-r md:col-span-2 xl:col-span-2'>
            <StoreSideNav />
          </motion.div>
          <div className='md:col-span-8 xl:col-span-8'>
            <motion.div {...slideAnimation('down')} className='mb-8'>
              <StoreTopNav />
            </motion.div>
            <Outlet />
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default StoreLayout
