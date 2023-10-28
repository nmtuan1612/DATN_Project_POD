import React from 'react'

const OnlineStoreProductCardSkeleton = () => {
  return (
    <div role='status' className='relative animate-pulse overflow-hidden rounded-lg bg-white p-2'>
      <div className='w-fll group relative overflow-hidden rounded-lg pt-[100%]'>
        <div className='absolute left-0 top-0 z-[1] aspect-square w-full bg-gray-300 object-cover' />
      </div>
      <div className='mt-2 overflow-hidden'>
        <div className='min-h-[1.6rem] rounded-lg bg-gray-300' />
        <div className='mt-1 h-4 w-[50%] rounded-lg bg-gray-200'></div>
        <div className='mt-2 h-4 w-[70%] rounded-lg bg-gray-200' />
      </div>
    </div>
  )
}

export default OnlineStoreProductCardSkeleton
