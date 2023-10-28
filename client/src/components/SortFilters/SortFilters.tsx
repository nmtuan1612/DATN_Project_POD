import React from 'react'
import { Link, createSearchParams, useLocation } from 'react-router-dom'
import Dropdown from 'src/components/Dropdown/Dropdown'
import { SortByFilters } from 'src/config/constants'
import useQueryConfig from 'src/hooks/useQueryConfig'

type Props = {
  title: string | React.ReactNode
}

const SortFilters = ({ title }: Props) => {
  const queryConfig = useQueryConfig()
  const { pathname } = useLocation()

  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-2xl font-semibold capitalize text-gray-800'>{title}</h2>
      <div className='flex items-center gap-4'>
        <span className='text-gray-600'>SortBy</span>
        <div className='z-20'>
          <Dropdown
            classStyleChildren='inline-flex items-center rounded-lg border-2 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-800 focus:border-primary focus:outline-none focus:ring-0'
            classStyleOptions='w-36 mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-around'
            options={() => (
              <ul className='w-max py-2 text-sm text-gray-700' aria-labelledby='dropdownDefaultButton'>
                {SortByFilters.map((filter) => (
                  <li key={filter.id}>
                    <Link
                      to={{ pathname, search: createSearchParams({ ...queryConfig, sortBy: filter.id }).toString() }}
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      {filter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          >
            {`${SortByFilters[0].title} `}
            <svg
              className='ml-2.5 h-2.5 w-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='m1 1 4 4 4-4'
              />
            </svg>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default SortFilters
