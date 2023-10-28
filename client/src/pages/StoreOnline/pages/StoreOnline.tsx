import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import storeApi from 'src/apis/store.api'
import InputSearch from 'src/components/InputSearch/InputSearch'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import SortFilters from 'src/components/SortFilters/SortFilters'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Product, ProductListConfig } from 'src/types/product.type'
import OnlineStoreProductCard from '../components/OnlineStoreProductCard/OnlineStoreProductCard'
import OnlineStoreProductCardSkeleton from '../components/OnlineStoreProductCard/OnlineStoreProductCardSkeleton'

type Props = {}

const StoreDetail = (props: Props) => {
  const queryConfig = useQueryConfig()
  // products of online store have to be published
  queryConfig.status = 'published'

  const { shopId } = useParams()
  const { pathname } = useLocation()

  const {
    data: productsData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['store_products', `${shopId}`, queryConfig],
    queryFn: () => storeApi.getProductsOfStore(shopId as string, queryConfig as ProductListConfig),
    staleTime: 2 * (60 * 1000)
  })

  const products: Product[] = productsData?.data?.data

  const { searchKey } = queryConfig

  const getTitle = () => {
    if (pathname) {
      return searchKey
        ? `Search result for: '${searchKey}'`
        : queryConfig.categoryId?.replaceAll('-', ' ') || 'All products'
    }
    return ''
  }

  return (
    <>
      <InputSearch placeholder='Search product by name...' pathname={pathname} queryConfig={queryConfig} />
      <div className='mt-6'>
        {/* <SortFilters title={queryConfig.categoryId?.replaceAll('-', ' ') || 'All products'} /> */}
        <SortFilters title={getTitle()} />
      </div>
      <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
        {isLoading ? (
          Array(12)
            .fill('skeleton')
            .map((item, idx) => (
              <div key={idx}>
                <OnlineStoreProductCardSkeleton />
              </div>
            ))
        ) : products?.length ? (
          products.map((product: any, idx: number) => (
            <div className='col-span-1' key={product._id + idx}>
              <OnlineStoreProductCard productData={product} />
            </div>
          ))
        ) : (
          <div className='md:col-span-3 lg:col-span-4 xl:col-span-4'>
            <ProductsListEmpty title='No product found!' />
          </div>
        )}
      </div>
    </>
  )
}

export default StoreDetail
