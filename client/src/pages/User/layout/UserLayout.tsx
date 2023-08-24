import { Outlet } from 'react-router-dom'
import UserSideNav from '../components/UserSideNav/UserSideNav'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from 'src/config/motion'

export default function UserLayout() {
  return (
    // <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
    <AnimatePresence>
      <motion.div {...fadeAnimation} className='container h-full py-10 text-gray-600'>
        <div className='grid h-full grid-cols-1 gap-6 md:grid-cols-12'>
          <motion.div {...slideAnimation('left')} className='border-r md:col-span-3 lg:col-span-3'>
            <UserSideNav />
          </motion.div>
          <motion.div {...slideAnimation('right')} className='md:col-span-9 lg:col-span-9'>
            <Outlet />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
