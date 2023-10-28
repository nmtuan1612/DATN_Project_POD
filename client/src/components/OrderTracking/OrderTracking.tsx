import React from 'react'

type Props = {}

const OrderTracking = (props: Props) => {
  return (
    <div className='border-l pl-6 text-xs'>
      <ol className='relative border-l border-gray-200 text-gray-500'>
        <li className='mb-6 ml-6'>
          <span className='absolute -left-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-200 ring-4 ring-white'>
            <svg
              className='h-3 w-3 text-green-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 16 12'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M1 5.917 5.724 10.5 15 1.5'
              />
            </svg>
          </span>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-3'>
              <h3 className='font-medium leading-tight text-gray-700'>18-10-2023 20:40</h3>
            </div>
            <div className='col-span-9'>
              <h4 className='font-semibold text-gray-600'>In transit</h4>
              <p className='text-xs'>Shipping to customer</p>
            </div>
          </div>
        </li>
        <li className='mb-6 ml-6'>
          <span className='absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white'></span>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-3'>
              <h3 className='font-medium leading-tight text-gray-700'>17-10-2023 14:20</h3>
            </div>
            <div className='col-span-9'>
              <p className='text-xs'>Preparing to ship</p>
            </div>
          </div>
        </li>
        <li className='mb-6 ml-6'>
          <span className='absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white'></span>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-3'>
              <h3 className='font-medium leading-tight text-gray-700'>16-10-2023 10:00</h3>
            </div>
            <div className='col-span-9'>
              <p className='text-xs'>Sent to production</p>
            </div>
          </div>
        </li>
        <li className='ml-6'>
          <span className='absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white'></span>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-3'>
              <h3 className='font-medium leading-tight text-gray-700'>16-10-2023 04:30</h3>
            </div>
            <div className='col-span-9'>
              <p className='text-xs'>Order is placed</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default OrderTracking
