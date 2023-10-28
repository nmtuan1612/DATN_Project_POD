import { useQuery } from '@tanstack/react-query'
import React from 'react'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import CommonProductList from '../CommonProductList/pages/CommonProductList'

type Props = {}

const SearchResultPage = (props: Props) => {
  const queryConfig = useQueryConfig()
  console.log(queryConfig)
  const {
    data: productsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['sample_products', queryConfig],
    queryFn: () => productApi.searchSampleProducts(queryConfig as ProductListConfig),
    staleTime: 2 * (60 * 1000)
  })

  const products = productsData?.data?.data

  return <CommonProductList isLoading={isLoading} queryConfig={queryConfig} products={products} />
}

export default SearchResultPage
