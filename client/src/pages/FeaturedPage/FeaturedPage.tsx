import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs'
import Loading from 'src/components/Loading/Loading'
import ProductCard from 'src/components/ProductCard/ProductCard'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import SortFilters from 'src/components/SortFilters/SortFilters'
import { fadeAnimation, slideAnimation } from 'src/config/motion'

type Props = {}

const FeaturedPage = (props: Props) => {
  const { pathname } = useLocation()
  const { featureId: hiddenTag } = useParams()

  const {
    data: productsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['featured_products', hiddenTag],
    queryFn: () => productApi.getListSampleProducts({ hiddenTag }),
    staleTime: 2 * (60 * 1000)
  })

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading />
      ) : (
        <motion.section {...fadeAnimation} className='container grid gap-6 overflow-scroll py-4 md:py-6 xl:gap-7'>
          <motion.div {...slideAnimation('left')}>
            <BreadCrumbs />
          </motion.div>
          <motion.div {...slideAnimation('right')}>
            <SortFilters title={hiddenTag} />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
              {productsData?.data?.data ? (
                productsData?.data?.data?.length ? (
                  productsData?.data?.data.map((product: any, idx: number) => (
                    <div className='col-span-1' key={product._id + idx}>
                      <ProductCard productData={product} />
                    </div>
                  ))
                ) : (
                  <div className='col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-4'>
                    <ProductsListEmpty title='No product found!' />
                  </div>
                )
              ) : (
                // skeleton
                <></>
              )}
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default FeaturedPage
