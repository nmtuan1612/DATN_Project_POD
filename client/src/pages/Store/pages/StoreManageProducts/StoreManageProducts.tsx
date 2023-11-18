import { useMutation, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { isEqual, omit } from 'lodash'
import React, { useMemo, useState } from 'react'
import { Link, createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import storeApi from 'src/apis/store.api'
import { CustomButton } from 'src/components'
import Dropdown from 'src/components/Dropdown/Dropdown'
import InputSearch from 'src/components/InputSearch/InputSearch'
import Modal from 'src/components/Modal/Modal'
import Tooltip from 'src/components/Tooltip/Tooltip'
import { AppUrls } from 'src/config/config'
import { SortByFilters, StoreProductStatus } from 'src/config/constants'
import { slideAnimation } from 'src/config/motion'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Product, ProductListConfig } from 'src/types/product.type'
import { handleSelectProductFilter } from 'src/utils/filters'
import { isAxiosError } from 'src/utils/utils'
import CopyProductsToStoresModal from '../../components/CopyProductsToStoresModal/CopyProductsToStoresModal'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import StoreProductCard from './components/StoreProductCard'

type Props = {}

const StoreManageProducts = (props: Props) => {
  const queryConfig = useQueryConfig()

  const [selected, setSelected] = useState<string[]>([])
  const [listIds, setListIds] = useState<string[]>([]) // use for header, modal actions
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false)
  const [copyToStore, setCopyToStore] = useState<boolean>(false)

  const { shopId } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['store_products', `${shopId}`, queryConfig],
    queryFn: () => storeApi.getProductsOfStore(shopId as string, queryConfig as ProductListConfig),
    staleTime: 2 * (60 * 1000)
  })
  const products = data?.data?.data

  const deleteProductMutation = useMutation({
    mutationFn: productApi.deleteStoreProduct
  })

  const updateListProductMutation = useMutation({ mutationFn: productApi.updateListStoreProducts })

  const allProductIds = useMemo(() => {
    return products ? products?.map((product: Product) => product._id) : []
  }, [products])

  const isSelectedAll = isEqual(selected, allProductIds)

  const filters = useMemo(() => {
    const objFilter: any = omit(queryConfig, ['page', 'limit'])
    let filters: { filterType: string; value: string }[] = []
    Object.keys(objFilter).forEach((key: string) => {
      if (objFilter[key]) {
        if (objFilter[key].includes(',')) {
          objFilter[key].split(',').forEach((value: string) => {
            filters.push({ filterType: key, value: value })
          })
        } else {
          filters.push({ filterType: key, value: objFilter[key] })
        }
      }
    })
    return filters
  }, [queryConfig])

  const handleSelectFilter = (filterType: keyof typeof queryConfig, value: string) => {
    const searchString = handleSelectProductFilter(queryConfig, filterType, value)
    navigate({
      pathname,
      search: searchString
    })
  }

  const handleSelectProduct = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(allProductIds)
    } else setSelected([])
  }

  const onSuccess = (data: any) => {
    toast.success(data.data?.message, { autoClose: 1000 })
    setConfirmVisible(false)
    setSelected([])
    refetch()
  }
  const onError = (error: any) => {
    if (isAxiosError(error)) {
      toast.error((error.response?.data as string) || '', { autoClose: 1000 })
      setConfirmVisible(false)
    }
  }

  const handleDelete = async () => {
    await deleteProductMutation.mutateAsync({ idsList: listIds }, { onSuccess, onError })
  }

  const handlePublish = async () => {
    await updateListProductMutation.mutateAsync(
      { idsList: selected, updateData: { status: 'published' } },
      { onSuccess, onError }
    )
  }

  const cancelCopyToStores = () => {
    setListIds([])
    setSelected([])
    setCopyToStore(false)
  }

  return (
    <AnimatePresence>
      <motion.section {...slideAnimation('right')}>
        {/* Header */}
        <div className='flex items-center gap-6'>
          <div className='flex-1'>
            <InputSearch placeholder='Search product by name' pathname={pathname} queryConfig={queryConfig} />
          </div>
          {/* filters */}
          <div className='flex items-center gap-2.5'>
            <Dropdown
              classStyleChildren='inline-flex items-center rounded-lg border-2 bg-white px-5 h-[46px] text-center text-base font-medium text-gray-600 focus:border-primary focus:outline-none focus:ring-0'
              classStyleOptions='w-full min-w-max z-10 mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-around'
              options={() => (
                <ul className='py-2 text-sm text-gray-700' aria-labelledby='dropdownDefaultButton'>
                  {SortByFilters.map((filter) => (
                    <li key={filter.id}>
                      <Link
                        to={{ pathname, search: createSearchParams({ ...queryConfig, sortBy: filter.id }).toString() }}
                        className='block px-4 py-2 hover:bg-gray-100'
                      >
                        {filter.title}
                      </Link>
                      {/* <input
                        id={filter.id}
                        type='checkbox'
                        checked={queryConfig.printBrandIds?.includes(filter.id)}
                        className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
                      />
                      <label htmlFor={filter.id}>{filter.title}</label> */}
                    </li>
                  ))}
                </ul>
              )}
            >
              <span>Priority</span>
              <svg
                className='ml-2.5 h-2.5 w-2.5'
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
            <Dropdown
              classStyleChildren='inline-flex items-center rounded-lg border-2 bg-white px-5 h-[46px] text-center text-base font-medium text-gray-600 focus:border-primary focus:outline-none focus:ring-0'
              classStyleOptions='w-full min-w-max z-10 mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow-around'
              options={() => (
                <ul className='py-2 text-sm text-gray-700' aria-labelledby='dropdownDefaultButton'>
                  {StoreProductStatus.map((status) => (
                    <li key={status.id} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'>
                      <input
                        id={status.id}
                        type='checkbox'
                        checked={queryConfig.status?.includes(status.id)}
                        onChange={() => handleSelectFilter('status', status.id)}
                        className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
                      />
                      <label htmlFor={status.id}>{status.name}</label>
                    </li>
                  ))}
                </ul>
              )}
            >
              <span>Status</span>
              <svg
                className='ml-2.5 h-2.5 w-2.5'
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
        </div>
        {/* Selected and filters */}
        <div className='mt-6 grid grid-cols-12 rounded-lg px-6 py-3'>
          <div className='col-span-5 flex h-8 items-center'>
            <input
              id='term-checkbox'
              type='checkbox'
              disabled={!products?.length}
              checked={isSelectedAll}
              onChange={(event) => handleSelectAll(event)}
              className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
            />
            <label htmlFor='term-checkbox' className='ml-2 text-base font-medium text-gray-500'>
              Select all
            </label>
          </div>
          <div className='col-span-7'>
            {selected?.length ? (
              <div className='mr-[-24px] flex items-center justify-end gap-2'>
                <CustomButton
                  title='Copy to stores'
                  type='outline'
                  customStyles='h-8'
                  handleClick={() => {
                    setListIds(selected)
                    setCopyToStore(true)
                  }}
                />
                <CustomButton title='Publish' type='outline' customStyles='h-8' handleClick={handlePublish} />
                <CustomButton
                  title='Delete'
                  type='danger'
                  customStyles='ml-6 h-[32px]'
                  handleClick={() => {
                    setListIds(selected)
                    setConfirmVisible(true)
                  }}
                />
              </div>
            ) : filters?.length ? (
              <div className='flex items-center gap-2'>
                <h3 className='mr-3 font-medium text-gray-500'>Filters:</h3>
                {filters.map((filter) => (
                  <div key={filter.value} className='flex w-fit items-center text-sm capitalize'>
                    <span className='rounded-bl-md rounded-tl-md bg-primary px-[6px] py-1 text-white'>
                      {filter.value}
                    </span>
                    <Link
                      to={{
                        pathname,
                        search: handleSelectProductFilter(
                          queryConfig,
                          filter.filterType as keyof ProductListConfig,
                          filter.value
                        )
                      }}
                      className='rounded-br-md rounded-tr-md border border-gray-300 px-1 py-[3px] hover:bg-gray-100'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='h-5 w-5'
                      >
                        <path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Products list */}
        {isLoading ? (
          <div role='status' className='mt-8 flex animate-pulse flex-col gap-5 rounded'>
            {Array(3)
              .fill('skeleton')
              .map((item, idx) => (
                <div
                  key={item + idx}
                  className='flex items-center justify-between gap-2 rounded-lg border px-6 py-4 shadow-around'
                >
                  <div className='h-20 w-20 rounded-lg bg-gray-300' />
                  <div className='flex-1'>
                    <div className='h-6 rounded-lg bg-gray-300' />
                    <div className='mt-1 h-4 w-[50%] rounded-lg bg-gray-200' />
                  </div>
                </div>
              ))}
          </div>
        ) : products?.length ? (
          <ul className='mt-2 flex flex-col gap-4'>
            {products?.map((product: Product) => (
              // product item
              <li
                // to={AppUrls.shopProductDetail(product._id)}
                key={product?._id}
              >
                <StoreProductCard
                  product={product}
                  selected={selected}
                  setSelected={setSelected}
                  refetch={refetch}
                  setListIds={setListIds}
                  setCopyToStore={setCopyToStore}
                  setConfirmVisible={setConfirmVisible}
                  handleSelectProduct={handleSelectProduct}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ProductsListEmpty />
        )}
        {/* Confirm delete modal */}
        <Modal
          visible={confirmVisible}
          canOk={Boolean(listIds?.length)}
          onOk={handleDelete}
          isLoading={deleteProductMutation.isLoading}
          onCancel={() => {
            setListIds([])
            setConfirmVisible(false)
          }}
        >
          <div className='text-center'>
            <svg
              className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <h3 className='text-lg font-normal text-gray-500'>Are you sure you want to delete this product?</h3>
          </div>
        </Modal>

        {/* Copy to store modal */}
        {products && (
          <CopyProductsToStoresModal
            listIds={listIds}
            visible={copyToStore}
            products={products}
            onCancel={cancelCopyToStores}
            // handleCopyToStores={() => {}}
          />
        )}
      </motion.section>
    </AnimatePresence>
  )
}

export default StoreManageProducts
