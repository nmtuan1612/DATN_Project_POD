import { omit } from 'lodash'
import React, { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import commonApi from 'src/apis/common.api'
import { CustomButton } from 'src/components'
import { Categories, ClothingSizes, ClothingTypes, OtherSizes, ShippingLocations } from 'src/config/constants'
import path from 'src/config/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { handleSelectProductFilter } from 'src/utils/filters'

type Props = {
  queryConfig: QueryConfig
}

const AsideFilters = ({ queryConfig }: Props) => {
  const [types, setTypes] = useState<{ name: string; _id: string }[]>(ClothingTypes)
  const [sizes, setSizes] = useState<{ name: string; id: string }[]>(ClothingSizes)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  let queries = { ...queryConfig }

  useEffect(() => {
    const getTypes = async (category: string) => {
      const data = await commonApi.getSampleProductType(category)
      setTypes(data)
    }
    if (pathname.includes(Categories[0].id) || pathname.includes(Categories[1].id)) {
      getTypes(Categories[0].id)
      setSizes(ClothingSizes)
    } else if (pathname.includes(Categories[2].id)) {
      getTypes(Categories[2].id)
      setSizes(OtherSizes)
    } else if (pathname.includes(path.productSearchResult)) {
      getTypes('all')
    } else {
      getTypes(Categories[3].id)
      setSizes(OtherSizes)
    }
  }, [pathname])

  const handleSelectFilter = (filterType: keyof typeof queryConfig, value: string) => {
    const searchString = handleSelectProductFilter(queries, filterType, value)
    navigate({
      pathname,
      search: searchString
    })
  }

  const handleClearAllFilter = () => {
    navigate({ pathname, search: createSearchParams(omit(queryConfig, ['typeIds', 'sizes', 'shipFrom'])).toString() })
  }

  return (
    <div>
      <div
        id='accordion-flush'
        data-accordion='open'
        data-active-classes='bg-white text-gray-900'
        data-inactive-classes='text-gray-500'
      >
        <h2 id='accordion-flush-heading-1'>
          <button
            type='button'
            className='flex w-full items-center justify-between py-5 pt-2 text-left font-medium text-gray-800'
            data-accordion-target='#accordion-flush-body-1'
            aria-expanded='true'
            aria-controls='accordion-flush-body-1'
          >
            <span>Types</span>
            <svg
              data-accordion-icon
              className='h-3 w-3 shrink-0 rotate-180'
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
                d='M9 5 5 1 1 5'
              />
            </svg>
          </button>
        </h2>
        <div id='accordion-flush-body-1' aria-labelledby='accordion-flush-heading-1'>
          <div className='flex flex-col border-b border-gray-200'>
            {types.map((type) => (
              <div className='mb-4 flex items-center' key={type._id}>
                <input
                  id={`checkbox-${type._id}`}
                  type='checkbox'
                  // defaultValue=''
                  checked={queries?.typeIds?.includes(type._id) || false}
                  onChange={() => handleSelectFilter('typeIds', type._id)}
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 checked:bg-primary focus:ring-0'
                />
                <label htmlFor={`checkbox-${type._id}`} className='ml-2 text-sm font-medium text-gray-900'>
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Sizes */}
        <h2 id='accordion-flush-heading-2'>
          <button
            type='button'
            className='flex w-full items-center justify-between py-5 text-left font-medium text-gray-800'
            data-accordion-target='#accordion-flush-body-2'
            aria-expanded='true'
            aria-controls='accordion-flush-body-2'
          >
            <span>Sizes</span>
            <svg
              data-accordion-icon
              className='h-3 w-3 shrink-0 rotate-180'
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
                d='M9 5 5 1 1 5'
              />
            </svg>
          </button>
        </h2>
        <div id='accordion-flush-body-2' aria-labelledby='accordion-flush-heading-2'>
          <div className='flex flex-col border-b border-gray-200'>
            {sizes.map((type) => (
              <div className='mb-4 flex items-center' key={type.id}>
                <input
                  id={`checkbox-${type.id}`}
                  type='checkbox'
                  checked={queries?.sizes?.split(',')?.includes(type.id) || false}
                  onChange={() => handleSelectFilter('sizes', type.id)}
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 checked:bg-primary focus:ring-0'
                />
                <label htmlFor={`checkbox-${type.id}`} className='ml-2 text-sm font-medium text-gray-900'>
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Shipping */}
        <h2 id='accordion-flush-heading-4'>
          <button
            type='button'
            className='flex w-full items-center justify-between py-5 text-left font-medium text-gray-800'
            data-accordion-target='#accordion-flush-body-4'
            aria-expanded='true'
            aria-controls='accordion-flush-body-4'
          >
            <span>Shipping from</span>
            <svg
              data-accordion-icon
              className='h-3 w-3 shrink-0 rotate-180'
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
                d='M9 5 5 1 1 5'
              />
            </svg>
          </button>
        </h2>
        <div id='accordion-flush-body-4' aria-labelledby='accordion-flush-heading-4'>
          <div className='flex flex-col border-b border-gray-200'>
            {ShippingLocations.map((type) => (
              <div className='mb-4 flex items-center' key={type.id}>
                <input
                  id={`checkbox-${type.id}`}
                  type='checkbox'
                  checked={queries?.shipFrom?.includes(type.id) || false}
                  onChange={() => handleSelectFilter('shipFrom', type.id)}
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 checked:bg-primary focus:ring-0'
                />
                <label htmlFor={`checkbox-${type.id}`} className='ml-2 text-sm font-medium text-gray-900'>
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <CustomButton
          title='Clear all filters'
          type='filled'
          customStyles='mt-5 w-full'
          handleClick={handleClearAllFilter}
        />
        {/* Price */}
        {/* <h2 id='accordion-flush-heading-3'>
          <button
            type='button'
            className='flex w-full items-center justify-between py-5 text-left font-medium text-gray-800'
            data-accordion-target='#accordion-flush-body-3'
            aria-expanded='true'
            aria-controls='accordion-flush-body-3'
          >
            <span>Price</span>
            <svg
              data-accordion-icon
              className='h-3 w-3 shrink-0 rotate-180'
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
                d='M9 5 5 1 1 5'
              />
            </svg>
          </button>
        </h2>
        <div id='accordion-flush-body-3' className='hidden' aria-labelledby='accordion-flush-heading-3'>
          <div className='flex flex-col border-b border-gray-200'>
            {types.map((type) => (
              <div className='mb-4 flex items-center' key={type.id}>
                <input      
                  id='checkbox-1'
                  type='checkbox'
                  defaultValue=''
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 checked:bg-primary focus:ring-0'
                />
                <label htmlFor='checkbox-1' className='ml-2 text-sm font-medium text-gray-900'>
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default AsideFilters
