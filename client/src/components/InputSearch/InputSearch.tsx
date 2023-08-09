import React from 'react'

type Props = {}

const InputSearch = (props: Props) => {
  return (
    <form className='flex items-center'>
      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            className='h-4 w-4 text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 21 21'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z'
            />
          </svg>
        </div>
        <input
          type='text'
          id='voice-search'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-primary focus:ring-primary'
          placeholder='Search products, brands, categories,...'
          required
        />
      </div>
      {/* search btn */}
      {/* <button
        type='submit'
        className='ml-2 inline-flex items-center rounded-lg border border-primary bg-primary px-3 py-2.5 font-medium text-white hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-primary'
      >
        <svg
          className='mr-2 h-4 w-4'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
        Search
      </button> */}
    </form>
  )
}

export default InputSearch
