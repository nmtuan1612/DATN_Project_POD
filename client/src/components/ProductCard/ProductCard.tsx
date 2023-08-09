import React from 'react'
import { Link } from 'react-router-dom'
import { AppUrls } from 'src/config/config'
import { Product as ProductType } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'

type Props = {
  productData: ProductType
}

const ProductCard = ({ productData: product }: Props) => {
  const generateTag = () => {
    switch (product.hiddenTag) {
      case 'Bestseller':
        return (
          <div className='absolute left-4 top-4 z-10 rounded-sm border-[1px] border-[#b15b0d] bg-amber-100 px-2 py-0.5 text-xs text-[#b15b0d]'>
            {product.hiddenTag}
          </div>
        )
      case 'New':
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

  return (
    <Link to={AppUrls.productDetail(generateNameId({ name: product.name, id: product._id }))}>
      <div className='relative overflow-hidden rounded-lg bg-white p-2 transition-transform duration-500 hover:translate-y-[-0.1rem] hover:shadow-around'>
        {generateTag()}
        <div className='w-fll relative overflow-hidden rounded-lg pt-[100%]'>
          <img
            src='https://images.printify.com/api/catalog/643cfea7d1be3ef343016b73.jpg?s=432'
            alt=''
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='mt-2 overflow-hidden'>
          <div className='text-md line-clamp-2 min-h-[2rem] text-gray-900'>Men's Sport Tee</div>

          <div className='mt-0 flex items-center'>
            <div className='max-w-[90%] truncate text-gray-600'>
              <span className='mr-1 text-sm'>From 14.5</span>
              <span className='text-xs'>USD</span>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 md:mt-3 lg:gap-4'>
            <span>6 sizes</span>
            <span>5 colors</span>
            <span>By Printvana</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
