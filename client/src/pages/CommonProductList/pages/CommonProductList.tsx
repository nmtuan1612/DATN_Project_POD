import React from 'react'
import AsideFilters from '../components/AsideFilters/AsideFilters'
import ProductCard from 'src/components/ProductCard/ProductCard'
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from 'src/config/motion'
import { useQuery } from '@tanstack/react-query'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import productApi from 'src/apis/product.api'
import { ProductListConfig, SampleProduct } from 'src/types/product.type'
import { useLocation } from 'react-router-dom'
import Loading from 'src/components/Loading/Loading'
import ProductCardSkeleton from 'src/components/ProductCard/ProductCardSkeleton'
import { Categories } from 'src/config/constants'
import SortFilters from 'src/components/SortFilters/SortFilters'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import path from 'src/config/path'

type Props = {
  isLoading: boolean
  queryConfig: QueryConfig
  products: SampleProduct[]
}

const CommonProductList = ({ isLoading, queryConfig, products }: Props) => {
  const { pathname } = useLocation()
  const { searchKey } = queryConfig

  const getTitle = () => {
    if (pathname) {
      const category: any = Categories.find((cat) => cat.id === pathname.split('/').pop())
      return category
        ? category.name
        : pathname.includes(path.productSearchResult)
        ? `${pathname.split('/').pop()?.replace('-', ' ')} for: '${searchKey}'`
        : ''
    }
    return ''
  }

  return (
    <AnimatePresence>
      <motion.section
        {...fadeAnimation}
        className='container grid grid-cols-12 gap-6 overflow-scroll py-4 md:py-6 xl:gap-7'
      >
        <motion.div {...slideAnimation('left')} className='col-span-12'>
          <BreadCrumbs />
        </motion.div>
        <motion.div {...slideAnimation('left')} className='col-span-3'>
          <AsideFilters queryConfig={queryConfig} />
        </motion.div>
        <motion.div {...slideAnimation('right')} className='col-span-9'>
          <SortFilters title={getTitle()} />
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
            {isLoading ? (
              Array(12)
                .fill('skeleton')
                .map((item, idx) => (
                  <div key={idx}>
                    <ProductCardSkeleton />
                  </div>
                ))
            ) : products?.length ? (
              products.map((product: any, idx: number) => (
                <div className='col-span-1' key={product._id + idx}>
                  <ProductCard productData={product} />
                </div>
              ))
            ) : (
              <div className='col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-4'>
                <ProductsListEmpty title='No product found!' />
              </div>
            )}
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}

export default CommonProductList
