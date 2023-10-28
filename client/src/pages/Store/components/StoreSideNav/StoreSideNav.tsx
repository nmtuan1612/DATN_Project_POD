import React, { useContext } from 'react'
import { Link, useLocation, useMatch, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { StoreOptions, UserOptions } from 'src/config/constants'
import { AppContext } from 'src/context/app.context'
import UserImg from 'src/assets/user.svg'
import Dropdown from 'src/components/Dropdown/Dropdown'
import path from 'src/config/path'
import useMyStores from 'src/hooks/useMyStores'
import { AppUrls } from 'src/config/config'
import { Store } from 'src/types/store.type'

type Props = {}

const StoreSideNav = (props: Props) => {
  const { currentStore } = useContext(AppContext)
  const { storeList, isLoading } = useMyStores()

  const { pathname } = useLocation()
  const { shopId } = useParams()

  const matchProductPage = useMatch(path.shopManageProducts)
  const matchOrderPage = useMatch(path.shopManageOrder)

  const generateLink = (store: Store) => {
    if (matchProductPage) {
      return AppUrls.shopManageProducts(store._id)
    } else if (matchOrderPage) {
      return AppUrls.shopManageOrder(store._id)
    } else {
      return AppUrls.shopSetting(store._id)
    }
  }

  return (
    <div className='flex flex-col pr-6'>
      {/* StoreSideNav */}

      <Dropdown
        classStyle='border-t border-b py-1'
        classStyleChildren='flex items-center rounded-lg p-2 font-medium text-gray-900 hover:bg-gray-100 group w-full'
        classStyleOptions='my-2 min-w-max list-none divide-y divide-gray-200 rounded-lg bg-white text-base shadow-around left-2 top-8/10'
        options={() => (
          <>
            <div className='flex items-center gap-2 px-4 py-2 text-primary'>
              <span className='block text-gray-900'>{currentStore?.storeName}</span>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <ul className='max-h-52 overflow-y-scroll py-2' aria-labelledby='store-menu-button'>
              {isLoading ? (
                <div role='status' className='max-w-md animate-pulse rounded'>
                  <div className='flex items-center justify-between gap-2 px-4 py-2'>
                    <div className='h-6 w-6 rounded-lg bg-gray-300' />
                    <div className='h-6 flex-1 rounded-lg bg-gray-200' />
                  </div>
                  <div className='flex items-center justify-between gap-2 px-4 py-2'>
                    <div className='h-6 w-6 rounded-lg bg-gray-300' />
                    <div className='h-6 flex-1 rounded-lg bg-gray-200' />
                  </div>
                </div>
              ) : storeList?.length ? (
                storeList
                  .filter((store: Store) => store._id !== currentStore?._id)
                  .map((store) => (
                    <li key={store?._id}>
                      <Link
                        to={generateLink(store)}
                        className='flex items-center gap-2 truncate px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-5 w-5'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
                          />
                        </svg>
                        {store?.storeName}
                      </Link>
                    </li>
                  ))
              ) : (
                <span className='px-4 py-2 text-xs italic text-gray-400'>You don't have any store.</span>
              )}
            </ul>
            {/* <div className='py-1'>
              <Link
                to={path.createShop}
                className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z'
                    clipRule='evenodd'
                  />
                </svg>
                Add a new store
              </Link>
              <Link
                to={path.userStores}
                className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
                  <path
                    fillRule='evenodd'
                    d='M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z'
                    clipRule='evenodd'
                  />
                </svg>
                Manage My Stores
              </Link>
            </div> */}
          </>
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
          />
        </svg>
        <span className='mx-4 block truncate'>{currentStore?.storeName}</span>
        <svg
          className='ml-2.5 h-2.5 w-2.5 transition-transform group-hover:rotate-180'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m1 1 4 4 4-4' />
        </svg>
      </Dropdown>
      {/* Tabs */}
      <ul className='' aria-labelledby='user-menu-button'>
        {StoreOptions.map((option) => {
          const isActive =
            option
              .url(currentStore?._id as string)
              .split('/')
              .pop() === pathname.split('/').pop()

          return (
            <li key={option.name}>
              <Link
                to={option.url(currentStore?._id as string)}
                className={classNames(
                  'text mt-3 flex items-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-gray-100',
                  {
                    'bg-gray-100 text-primary': isActive,
                    'bg-white': !isActive
                  }
                )}
              >
                <span dangerouslySetInnerHTML={{ __html: option.icon }} className='side__nav-icon' />
                {option.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default StoreSideNav
