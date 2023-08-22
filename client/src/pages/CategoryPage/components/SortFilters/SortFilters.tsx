import React from 'react'
import { useLocation } from 'react-router-dom'
import Dropdown from 'src/components/Dropdown/Dropdown'
import { Categories, SortByFilters } from 'src/config/constants'

type Props = {}

const SortFilters = (props: Props) => {
  const { pathname } = useLocation()

  const getTitle = () => {
    if (pathname) {
      const category: any = Categories.find((cat) => cat.id === pathname.split('/').pop())
      return category ? category.name : ''
    }
    return ''
  }
  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-2xl font-semibold text-gray-900'>{getTitle()}</h2>
      <div className='flex items-center gap-4'>
        <span className='text-gray-600'>SortBy</span>
        <div className='z-20'>
          <Dropdown
            classStyleChildren='inline-flex items-center rounded-lg border-2 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-800 focus:border-primary focus:outline-none focus:ring-0'
            classStyleOptions='w-36 mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-around'
            options={() => (
              <ul className='py-2 text-sm text-gray-700' aria-labelledby='dropdownDefaultButton'>
                {SortByFilters.map((filter) => (
                  <li key={filter.id}>
                    <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                      {filter.title}
                    </a>
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
          {/* <button
            id='dropdownDefaultButton'
            data-dropdown-toggle='sortDropdown'
            className='inline-flex items-center rounded-lg border-2 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-800 focus:border-primary focus:outline-none focus:ring-0'
            type='button'
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
          </button> */}
          {/* Dropdown menu */}
          {/* <div
            id='sortDropdown'
            className='z-10 hidden w-36 divide-y divide-gray-100 rounded-lg bg-white shadow-around'
          >
            <ul className='py-2 text-sm text-gray-700' aria-labelledby='dropdownDefaultButton'>
              {SortByFilters.map((filter) => (
                <li key={filter.id}>
                  <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                    {filter.title}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SortFilters
