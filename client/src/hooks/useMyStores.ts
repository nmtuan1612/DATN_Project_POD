import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import storeApi from 'src/apis/store.api'
import { AppContext } from 'src/context/app.context'
import { Store } from 'src/types/store.type'

type Props = {}

const useMyStores = (): [storeList: Store[], isLoading: boolean] => {
  const { profile } = useContext(AppContext)
  const { data, isLoading } = useQuery({
    queryKey: ['my_stores'],
    queryFn: () => storeApi.getUserStores({ id: profile?._id || '' })
  })

  const storeList = data?.data?.data

  return [storeList, isLoading]
}

export default useMyStores
