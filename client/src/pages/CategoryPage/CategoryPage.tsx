import React from 'react'
import AsideFilters from './components/AsideFilters/AsideFilters'
import SortFilters from './components/SortFilters/SortFilters'
import { productMockData } from 'src/config/mockData'
import ProductCard from 'src/components/ProductCard/ProductCard'
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from 'src/config/motion'

type Props = {}

const productsData = Array(20).fill(productMockData)

const CategoryPage = (props: Props) => {
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
          <AsideFilters />
        </motion.div>
        <motion.div {...slideAnimation('right')} className='col-span-9'>
          <SortFilters />
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
            {productsData.map((product) => (
              <div className='col-span-1' key={product._id}>
                <ProductCard productData={product} />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}

export default CategoryPage
