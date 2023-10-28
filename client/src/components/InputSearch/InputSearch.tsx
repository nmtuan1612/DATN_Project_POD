import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/config/path'

type Props = {
  placeholder?: string
  pathname: string
  queryConfig: any
}

const InputSearch = ({ placeholder = 'Search product', pathname, queryConfig }: Props) => {
  const [value, setValue] = useState<string>('')

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(e.target.value)
    // if (e.target.value) {}
    navigate({
      pathname,
      search: createSearchParams({ ...queryConfig, searchKey: e.target.value }).toString()
    })
  }

  return (
    <form
      className='flex items-center'
      // onSubmit={(e) => {
      //   e.preventDefault()
      //   navigate({ pathname, search: createSearchParams({ ...queryConfig, searchKey: value }).toString() })
      // }}
    >
      <label htmlFor='default-search' className='sr-only mb-2 text-sm font-medium text-gray-900'>
        Search
      </label>
      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            className='h-4 w-4 text-gray-500'
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
        </div>
        <input
          required
          type='search'
          id='default-search'
          value={queryConfig?.searchKey || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-primary focus:ring-0'
        />
        {/* <button
          type='submit'
          className='absolute bottom-[5px] right-2.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-0'
        >
          Search
        </button> */}
      </div>
    </form>
  )
}

export default InputSearch
