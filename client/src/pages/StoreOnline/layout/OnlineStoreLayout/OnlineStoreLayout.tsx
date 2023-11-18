import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import storeApi from 'src/apis/store.api'
import Loading from 'src/components/Loading/Loading'
import { AppContext } from 'src/context/app.context'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Store } from 'src/types/store.type'
import { setStoreToLS } from 'src/utils/auth'
import StoreFooter from '../../components/StoreFooter/StoreFooter'
import StoreHeader from '../../components/StoreHeader/StoreHeader'
import UserChats from 'src/pages/User/pages/UserChats/UserChats'

type Props = {
  children: React.ReactNode
}

const OnlineStoreLayout = ({ children }: Props) => {
  const { currentStore, setCurrentStore } = useContext(AppContext)
  const queryConfig = useQueryConfig()
  // products of online store have to be published
  queryConfig.status = 'published'

  const { shopId } = useParams()
  const { data: storeData } = useQuery({
    queryKey: ['store', shopId || currentStore?._id],
    queryFn: () => storeApi.getStoreWithId({ id: shopId || (currentStore?._id as string) }),
    staleTime: 10 * (60 * 1000)
  })

  const store: Store = storeData?.data?.data

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    if (store) {
      setCurrentStore(store)
      setStoreToLS(store)
    }
  }, [store])

  return (
    <div className='app transition-all ease-in'>
      {!store ? (
        <Loading />
      ) : (
        <div className='container z-10 flex h-full flex-col justify-start gap-6 overflow-scroll'>
          {/* Header */}
          <StoreHeader store={store} />
          <div className='mt-[70px] flex-1 py-10'>{children}</div>

          {/* Footer */}
          <StoreFooter store={store} />

          {/* Chat */}
          <UserChats />
        </div>
      )}
    </div>
  )
}

export default OnlineStoreLayout
