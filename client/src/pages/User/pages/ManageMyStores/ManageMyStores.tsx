import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import storeImage from 'src/assets/store.svg'
import { CustomButton } from 'src/components'
import config, { AppUrls } from 'src/config/config'
import { slideAnimation } from 'src/config/motion'
import { AppContext } from 'src/context/app.context'
import useMyStores from 'src/hooks/useMyStores'
import { Store } from 'src/types/store.type'
import { setStoreToLS } from 'src/utils/auth'

type Props = {}

const ManageMyStores = (props: Props) => {
  const { setCurrentStore } = useContext(AppContext)
  const { storeList, isLoading } = useMyStores()

  const navigate = useNavigate()

  return (
    <AnimatePresence>
      <motion.div {...slideAnimation('right')} className='container'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-gray-900'>My Stores</h2>
          <CustomButton
            type='filled'
            title={
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='mr-1 h-5 w-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z'
                    clipRule='evenodd'
                  />
                </svg>
                Add new store
              </>
            }
            handleClick={() => navigate(AppUrls.createShop)}
          />
        </div>
        {isLoading ? (
          <div role='status' className='mt-8 flex animate-pulse flex-col gap-5 rounded'>
            {Array(3)
              .fill('skeleton')
              .map((item, idx) => (
                <div
                  key={item + idx}
                  className='flex items-center justify-between gap-2 rounded-lg p-6 pr-8 shadow-around'
                >
                  <div className='h-12 w-12 rounded-full bg-gray-300' />
                  <div className='flex-1'>
                    <div className='h-6 rounded-lg bg-gray-300' />
                    <div className='mt-1 h-4 w-[50%] rounded-lg bg-gray-200' />
                  </div>
                </div>
              ))}
          </div>
        ) : storeList?.length ? (
          <ul className='mt-8 flex flex-col gap-5'>
            {storeList?.map((store: Store) => (
              <div
                key={store?._id}
                className='grid grid-cols-12 rounded-lg p-6 pr-8 shadow-around transition-all duration-300 hover:translate-y-[-0.1rem] hover:shadow-around'
              >
                <div className='col-span-5'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={store.logo || storeImage}
                      alt=''
                      className='h-12 w-12 rounded-full border-2 border-gray-200 object-cover'
                    />
                    <div className=''>
                      <a
                        target='_blank'
                        href={`${config.development.frontendUrl}${AppUrls.shopOnlineDetail(store?._id)}`}
                        className='mb-2 block text-xl font-semibold hover:text-primary'
                      >
                        {store.storeName}
                      </a>
                      {store.isActive ? (
                        <span className='flex items-center gap-1 text-sm text-primary'>
                          <div className='h-2 w-2 rounded-full bg-primary' /> Active
                        </span>
                      ) : (
                        <span className='flex items-center gap-1 text-sm text-gray-400'>
                          <div className='h-2 w-2 rounded-full bg-gray-400' /> Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-span-5 flex items-center justify-between'>
                  <div className='flex gap-8'>
                    <div className='flex flex-col items-center'>
                      <span className='text-sm text-gray-500'>Products</span>
                      <span className='text-gray-800'>{store.products?.length}</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <span className='text-sm text-gray-500'>Orders</span>
                      <span className='text-gray-800'>{store.orders?.length}</span>
                    </div>
                  </div>
                  <div className=''>
                    {store.isActive ? (
                      <CustomButton type='outline' title='Inactive' customStyles='px-4 py-1.5 md:px-4 md:py-1.5' />
                    ) : (
                      <CustomButton type='filled' title='Active' customStyles='px-4 py-1.5 md:px-4 md:py-1.5' />
                    )}
                  </div>
                </div>
                <div className='col-span-2 flex items-center justify-end gap-4'>
                  <Link
                    to={AppUrls.shopSetting(store?._id)}
                    className='rounded-lg p-1 hover:bg-gray-200'
                    onClick={() => {
                      setCurrentStore(store)
                      setStoreToLS(store)
                    }}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                      <path
                        fillRule='evenodd'
                        d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Link>
                  <div className='cursor-pointer rounded-lg p-1 hover:bg-gray-200'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='h-[22px] w-[22px]'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <div className='mt-8 flex items-end gap-2'>
            <span className='italic text-gray-400'>You don't have any store.</span>
            <Link to={AppUrls.createShop} className='text-xl font-semibold text-primary hover:opacity-80'>
              Let's create!
            </Link>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default ManageMyStores
