import { useQuery } from '@tanstack/react-query'
import React, { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductCard from 'src/components/ProductCard/ProductCard'
import ProductCardSkeleton from 'src/components/ProductCard/ProductCardSkeleton'
import { AppUrls } from 'src/config/config'
import { productMockData } from 'src/config/mockData'
import { Product, SampleProduct } from 'src/types/product.type'

type Props = {
  title: string
  hiddenTag: string
}

const FeaturedProducts = ({ title, hiddenTag }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['featured_products', hiddenTag],
    queryFn: () => productApi.getListSampleProducts({ hiddenTag }),
    staleTime: 2 * (60 * 1000)
  })
  const products: SampleProduct[] = data?.data?.data
  // useEffect(() => {
  //   hiddenTag === 'Bestseller' && setProducts(Array(5).fill({ ...productMockData, hiddenTag: 'Bestseller' }))
  //   hiddenTag === 'New' && setProducts(Array(10).fill({ ...productMockData, hiddenTag: 'New' }))
  //   hiddenTag === 'Eco' && setProducts(Array(10).fill({ ...productMockData, hiddenTag: 'Eco-friendly' }))
  // }, [hiddenTag])

  return (
    <div>
      <div className='grid grid-cols-4'>
        <div className='hidden lg:col-span-1 lg:block' />
        <div className='col-span-2'>
          <h2 className='text-[24px] font-semibold text-gray-700 lg:text-center'>{title}</h2>
        </div>
        <div className='col-span-2 flex items-center justify-end lg:col-span-1'>
          <Link
            // to={AppUrls.categoryFeatured(title.replace(' ', '-'))}
            to={AppUrls.categoryFeatured(title)}
            className='flex items-center gap-3 rounded-lg px-3 py-1 font-medium text-primary hover:bg-primary hover:text-white focus:outline-none md:px-3 md:py-1.5'
          >
            View All
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
              <path
                fillRule='evenodd'
                d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className={`mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}>
        {isLoading
          ? Array(5)
              .fill('skeleton')
              .map((item, idx) => (
                <div key={idx}>
                  <ProductCardSkeleton />
                </div>
              ))
          : products?.map((product: SampleProduct, idx: number) => (
              <div className='col-span-1' key={product._id}>
                <ProductCard productData={product} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
