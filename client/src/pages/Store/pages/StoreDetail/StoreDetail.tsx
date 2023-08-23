import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import storeApi from 'src/apis/store.api'
import { AppContext } from 'src/context/app.context'

type Props = {}

const StoreDetail = (props: Props) => {
  const { currentStore } = useContext(AppContext)
  const { data: store, isLoading } = useQuery({
    queryKey: ['store_with_id'],
    queryFn: () => storeApi.getStoreWithId({ id: currentStore?._id as string })
    // staleTime: 5000
  })
  return <div>StoreDetail</div>
}

export default StoreDetail
