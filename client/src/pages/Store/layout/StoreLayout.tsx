import React from 'react'
import StoreSideNav from '../components/StoreSideNav/StoreSideNav'
import { Outlet } from 'react-router-dom'

type Props = {}

const StoreLayout = (props: Props) => {
  return (
    <div className='h-full py-10 text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='border-r md:col-span-3 xl:col-span-3'>
            <StoreSideNav />
          </div>
          <div className='md:col-span-9 xl:col-span-9'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLayout
