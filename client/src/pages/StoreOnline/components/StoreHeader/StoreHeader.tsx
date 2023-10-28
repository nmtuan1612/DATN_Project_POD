import classNames from 'classnames'
import { useContext } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import { AppUrls } from 'src/config/config'
import { Categories } from 'src/config/constants'
import { AppContext } from 'src/context/app.context'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Store } from 'src/types/store.type'
import { getLogoUrl } from 'src/utils/utils'
import Cart from '../../../../components/Cart/Cart'
import UserDropdown from 'src/components/UserDropdown/UserDropdown'

type Props = {
  store: Store
}

const StoreHeader = ({ store }: Props) => {
  const { currentStore } = useContext(AppContext)
  const queryConfig = useQueryConfig()

  return (
    <nav className='container fixed left-0 right-0 top-0 z-50 bg-white shadow-sm'>
      <div className='flex flex-wrap items-center justify-between py-3.5'>
        {/* header left */}
        {/* logo */}
        <Link to={AppUrls.shopOnlineDetail(currentStore?._id as string)} className='flex items-center gap-4'>
          <img src={store.logo || getLogoUrl()} alt='store-avt' className='h-12 w-12 rounded-lg object-cover' />
          <h2 className='text-3xl font-semibold text-primary'>{store.storeName}</h2>
        </Link>
        {/* links */}
        <div className='flex flex-wrap items-center space-x-8'>
          <Link
            to={AppUrls.shopOnlineDetail(currentStore?._id as string)}
            className={classNames('border-b-2 hover:border-primary', {
              'border-white text-gray-500': queryConfig.categoryId,
              'border-primary font-semibold text-gray-700': !queryConfig.categoryId
            })}
          >
            All Products
          </Link>
          {Categories.map((category) => (
            <Link
              key={category.id}
              to={{
                pathname: AppUrls.shopOnlineDetail(currentStore?._id as string),
                search: createSearchParams({ categoryId: category.id }).toString()
              }}
              className={classNames('inline-block border-b-2 hover:border-primary', {
                'border-white text-gray-500': queryConfig.categoryId !== category.id,
                'border-primary font-semibold text-gray-700': queryConfig.categoryId === category.id
              })}
            >
              {category.name.replace('Clothes', '')}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-6'>
          {/* cart */}
          <Cart />
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}

export default StoreHeader
