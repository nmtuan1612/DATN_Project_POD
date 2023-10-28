import { useContext } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import bidv from 'src/assets/BIDV.svg'
import americanExpress from 'src/assets/american_express.png'
import masterCard from 'src/assets/mastercard.svg'
import visa from 'src/assets/visa.svg'
import { AppUrls } from 'src/config/config'
import { Categories } from 'src/config/constants'
import path from 'src/config/path'
import { AppContext } from 'src/context/app.context'
import { Store } from 'src/types/store.type'
import { getLogoUrl } from 'src/utils/utils'

type Props = {
  store: Store
}

const StoreFooter = ({ store }: Props) => {
  const { currentStore } = useContext(AppContext)

  return (
    <div className='my-6'>
      <div className='flex justify-between border-t py-10'>
        {/* col 1 */}
        <div className='col-span-3'>
          <Link
            to={AppUrls.shopOnlineDetail(currentStore?._id as string)}
            className='flex w-fit flex-col items-start gap-4'
          >
            <img
              src={store.logo || getLogoUrl()}
              alt='store-avt'
              className='h-[50px] w-[50px] rounded-lg object-cover'
            />
            <h2 className='text-3xl font-semibold text-primary'>{store.storeName}</h2>
          </Link>
        </div>
        {/* col 2 */}
        <div className='col-span-3'>
          {/* links */}
          <div className='flex w-fit flex-col flex-wrap space-y-4'>
            {Categories.map((category) => (
              <Link
                key={category.id}
                to={{
                  pathname: AppUrls.shopOnlineDetail(currentStore?._id as string),
                  search: createSearchParams({ categoryId: category.id }).toString()
                }}
                className='inline-block border-b-2 border-white hover:border-primary'
              >
                {category.name.replace('Clothes', '')}
              </Link>
            ))}
          </div>
        </div>
        {/* col 3 */}
        <div className='col-span-3'>
          <div className='flex w-fit flex-col flex-wrap space-y-4'>
            <Link to='#' className='inline-block border-b-2 border-white hover:border-primary'>
              Privacy policy
            </Link>
            <Link to='#' className='inline-block border-b-2 border-white hover:border-primary'>
              Term & conditions
            </Link>
          </div>
        </div>
        {/* col 4 */}
        <div className='col-span-3'>
          <div className='flex justify-end space-x-2'>
            <img src={visa} alt='visa' />
            <img src={masterCard} alt='master_card' />
            <div className='flex h-[24px] w-[34px] items-center justify-center overflow-hidden rounded-sm border p-0.5'>
              <img src={bidv} alt='bidv' className='object-contain' />
            </div>
            <div className='flex h-[24px] w-[34px] items-center justify-center overflow-hidden rounded-sm border p-0'>
              <img src={americanExpress} alt='american_express' />
            </div>
          </div>
        </div>
      </div>
      <p className='mt-3 text-center italic text-gray-500'>
        Powered by{' '}
        <Link to={path.home} className='font-semibold text-primary'>
          @CreoPrint
        </Link>
      </p>
    </div>
  )
}

export default StoreFooter
