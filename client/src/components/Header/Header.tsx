import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { clearLS } from 'src/utils/auth'
import { Categories, NavbarLinks, UserOptions, primaryColor } from '../../config/constants'
import path from '../../config/path'
import CustomButton from '../CustomButton/CustomButton'
import Dropdown from '../Dropdown/Dropdown'
import UserImg from 'src/assets/user.svg'
import './Header.style.scss'
import useMyStores from 'src/hooks/useMyStores'
import { AppUrls } from 'src/config/config'
import Cart from '../Cart/Cart'
import UserDropdown from '../UserDropdown/UserDropdown'

type Props = {}

const Header = (props: Props) => {
  const { isAuthenticated } = useContext(AppContext)
  const { storeList, isLoading } = useMyStores()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className='fixed left-0 right-0 top-0 z-50 bg-white shadow-md'>
      <div className='container'>
        <div className='flex flex-wrap items-center justify-between py-3.5'>
          <Link to='/' className='logo'>
            {/* PrintVana */}
            <span className='text-primary'>Creo</span>
            <span className='text-gray-400'>Print</span>
          </Link>
          <div className='flex items-center md:order-2'>
            {!isAuthenticated ? (
              <>
                <CustomButton
                  title='Login'
                  type='outline'
                  handleClick={() => navigate(path.login)}
                  customStyles='mr-1 text-gray-800 hover:bg-gray-50 focus:outline-none md:mr-2'
                />
                <CustomButton
                  title='Sign up'
                  type='filled'
                  handleClick={() => navigate(path.register)}
                  customStyles='mr-1 bg-primary text-white hover:bg-primary/80 focus:outline-none md:mr-2'
                />
              </>
            ) : (
              <div className='flex items-center'>
                {/* My store */}
                <div className='mr-6'>
                  <Dropdown
                    classStyleChildren='flex items-center rounded-lg p-2 font-semibold text-gray-900 hover:bg-gray-200'
                    classStyleOptions='my-2 min-w-max list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-around'
                    options={() => (
                      <>
                        <div className='px-4 py-2'>
                          <span className='block text-base text-gray-900'>My store</span>
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
                            storeList.map((store) => (
                              <li key={store?._id}>
                                <Link
                                  to={AppUrls.shopManageProducts(store?._id)}
                                  className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
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
                                  {store.storeName}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <span className='px-4 py-2 text-xs italic text-gray-400'>You don't have any store.</span>
                          )}
                        </ul>
                        <div className='py-1'>
                          <Link
                            to={path.createShop}
                            className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              className='h-5 w-5'
                            >
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
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              className='h-5 w-5'
                            >
                              <path
                                fillRule='evenodd'
                                d='M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Manage My Stores
                          </Link>
                        </div>
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
                    <span className='mx-4'>My store</span>
                    <svg
                      className='ml-0 h-2.5 w-2.5 transition-transform group-hover:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 10 6'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='m1 1 4 4 4-4'
                      />
                    </svg>
                  </Dropdown>
                </div>

                {/* User */}
                <div>
                  <UserDropdown />
                </div>

                <div className='ml-6'>
                  <Cart />
                </div>
              </div>
            )}

            <button
              data-collapse-toggle='mega-menu'
              type='button'
              className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden'
              aria-controls='mega-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='h-5 w-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div id='mega-menu' className='hidden w-full items-center justify-between md:order-1 md:flex md:w-auto'>
            <ul className='mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8'>
              <li className='group relative'>
                <button
                  id='mega-menu-dropdown-button'
                  // data-dropdown-toggle='mega-menu-dropdown'
                  // data-dropdown-trigger='hover'
                  className='nav__link-item flex w-full items-center justify-between font-medium md:w-auto'
                  style={pathname.startsWith('/products') || pathname === '/' ? { color: primaryColor } : {}}
                  onClick={() => navigate('/')}
                >
                  Mega Menu{' '}
                  <svg
                    className='ml-2.5 h-2.5 w-2.5 transition-transform group-hover:rotate-180'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m1 1 4 4 4-4'
                    />
                  </svg>
                </button>
                <div
                  id='mega-menu-dropdown'
                  className='absolute top-full z-30 hidden min-w-max max-w-screen-xl grid-cols-2 whitespace-nowrap rounded-lg border border-gray-100 bg-white text-sm shadow-md group-hover:grid md:grid-cols-3'
                >
                  <div className='p-4 pb-0 text-gray-900 md:pb-4'>
                    <ul className='space-y-4'>
                      {Categories.map((category) => (
                        <li key={category.id}>
                          <Link to={AppUrls.categoryProduct(category.id)} className='text-gray-500 hover:text-primary'>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='p-4 pb-0 text-gray-900 md:pb-4'>
                    <ul className='space-y-4'>
                      <li>
                        <Link to={AppUrls.categoryProduct('Bestsellers')} className='text-gray-500 hover:text-primary'>
                          Bestsellers
                        </Link>
                      </li>
                      <li>
                        <Link to={AppUrls.categoryProduct('New-Arrivals')} className='text-gray-500 hover:text-primary'>
                          New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link to={AppUrls.categoryProduct('Eco-friendly')} className='text-gray-500 hover:text-primary'>
                          Eco-friendly
                        </Link>
                      </li>
                      <li>
                        <Link to='#' className='text-gray-500 hover:text-primary'>
                          License
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className='p-4'>
                    <ul className='space-y-4'>
                      <li>
                        <Link to='#' className='text-gray-500 hover:text-primary'>
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link to='#' className='text-gray-500 hover:text-primary'>
                          Support Center
                        </Link>
                      </li>
                      <li>
                        <Link to='#' className='text-gray-500 hover:text-primary'>
                          Terms
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {NavbarLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    className='nav__link-item block'
                    style={pathname.startsWith(link.url) ? { color: primaryColor } : {}}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header

{
  /* <button
  type='button'
  className='group flex items-center rounded-lg p-2 font-semibold text-gray-900 hover:bg-gray-200'
  id='store-menu-button'
  aria-expanded='false'
  data-dropdown-toggle='store-dropdown'
  data-dropdown-placement='bottom-end'
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
  <span className='mx-4'>My store 1</span>
  <svg
    className='ml-2.5 h-2.5 w-2.5 transition-transform group-hover:rotate-180'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 10 6'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m1 1 4 4 4-4'
    />
  </svg>
</button>
<div
  className='z-50 my-4 hidden list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-around'
  id='store-dropdown'
>
  <div className='px-4 py-3'>
    <span className='block text-sm text-gray-900'>My store 1</span>
  </div>
  <ul className='py-2' aria-labelledby='store-menu-button'>
    {storeData.map((store) => (
      <li key={store}>
        <Link
          to='#'
          className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
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
          {store}
        </Link>
      </li>
    ))}
  </ul>
  <div className='py-1'>
    <Link
      to='#'
      className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        className='h-5 w-5'
      >
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z'
          clipRule='evenodd'
        />
      </svg>
      Add a new store
    </Link>
    <Link
      to='#'
      className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        className='h-5 w-5'
      >
        <path
          fillRule='evenodd'
          d='M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z'
          clipRule='evenodd'
        />
      </svg>
      Manage My Stores
    </Link>
  </div>
</div> */
}
