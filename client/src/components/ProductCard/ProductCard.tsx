import classNames from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppUrls } from 'src/config/config'
import { SampleProduct as SampleProductType } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'

type Props = {
  productData: SampleProductType
}

const ProductCard = ({ productData: product }: Props) => {
  const [imgLoading, setImgLoading] = useState(true)

  const generateTag = () => {
    switch (product.hiddenTag) {
      case 'Bestsellers':
        return (
          // <div className='absolute left-4 top-4 z-10 rounded-sm border-[1px] border-[#b15b0d] bg-amber-100 px-2 py-0.5 text-xs text-[#b15b0d]'>
          <div className='absolute left-4 top-4 z-10 rounded-sm border-[1px] border-primary bg-purple-100 px-2 py-0.5 text-xs text-primary'>
            {product.hiddenTag}
          </div>
        )
      case 'New Arrivals':
        return (
          <div className='absolute left-4 top-4 z-10 rounded-sm border-[1px] border-blue-700 bg-blue-100 px-2 py-0.5 text-xs text-blue-800'>
            {product.hiddenTag}
          </div>
        )
      case 'Eco-friendly':
        return (
          <div className='absolute left-4 top-4 z-10 rounded-sm border-[1px] border-green-700 bg-green-100 px-2 py-0.5 text-xs text-green-700'>
            {product.hiddenTag}
          </div>
        )
      default:
        return <></>
    }
  }

  return product ? (
    <Link to={AppUrls.productDetail(generateNameId({ name: product.name, id: product._id }))}>
      <div className='relative overflow-hidden rounded-lg bg-white p-2 transition-transform duration-500 hover:translate-y-[-0.1rem] hover:shadow-around'>
        {generateTag()}
        <div className='w-fll group relative overflow-hidden rounded-lg pt-[100%]'>
          {/* img loading spinner */}
          <div
            className={classNames(
              'absolute left-0 top-0 z-[1] flex h-full w-full items-center justify-center bg-gray-50',
              {
                'hidden ': !imgLoading,
                'block ': imgLoading
              }
            )}
          >
            <svg
              aria-hidden='true'
              className='inline h-10 w-10 animate-spin fill-purple-600 text-gray-200'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          </div>
          {/* Product img */}
          <img
            src={product.image}
            alt=''
            className={classNames('absolute left-0 top-0 z-[1] h-full w-full bg-white object-cover', {
              'hidden ': imgLoading,
              'block ': !imgLoading
            })}
            onLoad={() => setImgLoading(false)}
          />
          {product?.otherImages?.length && (
            <img
              src={product?.otherImages?.[0]}
              alt='other-img'
              className={classNames(
                'absolute left-0 top-0 h-full w-full bg-white object-cover transition-transform duration-300 group-hover:z-[2] group-hover:scale-110',
                {
                  'hidden ': imgLoading,
                  'block ': !imgLoading
                }
              )}
            />
          )}
        </div>
        <div className='mt-2 overflow-hidden'>
          <div className='line-clamp-2 min-h-[2rem] text-[18px] font-medium text-gray-800'>{product.name}</div>

          <div className='mt-0 flex items-center'>
            <div className='max-w-[90%] truncate text-gray-600'>
              <span className='mr-1 text-sm'>From {product.price}</span>
              <span className='text-xs'>USD</span>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 md:mt-3 lg:gap-4'>
            <span>{product.sizeGuides?.sizes?.length} sizes</span>
            {/* <span>5 colors</span> */}
            <span>By Printvana</span>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <></>
  )
}

export default ProductCard
