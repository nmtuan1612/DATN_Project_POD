import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import CommonProductList from '../CommonProductList/pages/CommonProductList'

type Props = {}

const CategoryPage = (props: Props) => {
  const { pathname } = useLocation()
  const queryConfig = useQueryConfig()
  queryConfig.categoryId = pathname.split('/').pop()

  const {
    data: productsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['sample_products', queryConfig],
    queryFn: () => productApi.getListSampleProducts(queryConfig as ProductListConfig),
    staleTime: 2 * (60 * 1000)
  })

  const products = productsData?.data?.data

  return <CommonProductList isLoading={isLoading} queryConfig={queryConfig} products={products} />
}

export default CategoryPage
