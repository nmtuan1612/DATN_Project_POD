import classNames from 'classnames'
import React from 'react'

type Props = {
  status: string
}

const OrderStatusBar = ({ status }: Props) => {
  return (
    <ol className='flex w-full items-center justify-between rounded-lg bg-gray-200 text-center text-sm font-medium text-gray-500 sm:text-base'>
      <li
        className={classNames('flex flex-1 items-center justify-center rounded-xl bg-primary px-3 py-1 text-white', {
          'rounded-br-none rounded-tr-none': status && status !== 'created'
        })}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='mr-2.5 h-5 w-5'>
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
            clipRule='evenodd'
          />
        </svg>
        Created
      </li>

      <li
        className={classNames('flex flex-1 items-center justify-center px-3 py-1', {
          'rounded-br-xl rounded-tr-xl bg-primary text-white': status === 'on-old',
          'bg-primary text-white': status === 'shipped' || status === 'delivered'
        })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-2.5 h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
          />
        </svg>
        On hold
      </li>

      <li
        className={classNames('flex flex-1 items-center justify-center px-3 py-1', {
          'rounded-br-xl rounded-tr-xl bg-primary text-white': status === 'shipped',
          'bg-primary text-white': status === 'delivered'
        })}
      >
        <span className='mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full  border-gray-500 text-xs'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
            <path
              fillRule='evenodd'
              d='M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z'
              clipRule='evenodd'
            />
            <path
              fillRule='evenodd'
              d='M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z'
              clipRule='evenodd'
            />
          </svg>
        </span>
        Shipped
      </li>

      <li className='flex flex-1 items-center justify-center px-3 py-1'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='mr-2.5 h-5 w-5'>
          <path
            fillRule='evenodd'
            d='M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z'
            clipRule='evenodd'
          />
        </svg>
        Delivered
      </li>
    </ol>
  )
}

export default OrderStatusBar
