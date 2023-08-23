import React from 'react'
import StoreSideNav from '../components/StoreSideNav/StoreSideNav'
import { Outlet } from 'react-router-dom'
import StoreTopNav from '../components/StoreTopNav/StoreTopNav'

type Props = {}

const StoreLayout = (props: Props) => {
  return (
    <div className='container h-full py-10 text-gray-600'>
      <div className='grid h-full grid-cols-1 gap-6 md:grid-cols-10'>
        <div className='border-r md:col-span-2 xl:col-span-2'>
          <StoreSideNav />
        </div>
        <div className='md:col-span-8 xl:col-span-8'>
          <div className='mb-8'>
            <StoreTopNav />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default StoreLayout
