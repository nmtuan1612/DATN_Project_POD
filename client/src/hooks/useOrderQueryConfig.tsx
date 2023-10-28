import { ProductListConfig } from 'src/types/product.type'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { StoreOrderListConfig } from 'src/types/order.type'

export type OrderQueryConfig = {
  [key in keyof StoreOrderListConfig]: string
}

export default function useOrderQueryConfig() {
  const queryParams: OrderQueryConfig = useQueryParams()
  const queryConfig: OrderQueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      status: queryParams.status,
      keySearch: queryParams.keySearch
    },
    isUndefined
  )
  return queryConfig
}
