import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import { CustomButton } from 'src/components'
import Tooltip from 'src/components/Tooltip/Tooltip'
import { AppUrls } from 'src/config/config'
import { Product } from 'src/types/product.type'
import { isAxiosError } from 'src/utils/utils'

type Props = {
  product: Product
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
  refetch: any
  setListIds: React.Dispatch<React.SetStateAction<string[]>>
  setCopyToStore: React.Dispatch<React.SetStateAction<boolean>>
  setConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
  handleSelectProduct: (id: string) => void
}

type UpdateParams = {
  productId: string
  body: any
}

const StoreProductCard = ({
  product,
  selected,
  setSelected,
  refetch,
  setListIds,
  setCopyToStore,
  setConfirmVisible,
  handleSelectProduct
}: Props) => {
  const storeProductMutation = useMutation({
    mutationFn: (data: UpdateParams) => productApi.updateStoreProduct(data.productId, data.body)
  })

  const handleChangeProductStatus = async (data: UpdateParams) => {
    await storeProductMutation.mutateAsync(data, {
      onSuccess(data) {
        toast.success(`Product ${data.data?.data?.name} is ${data.data?.data?.status}!`, { autoClose: 1000 })
        refetch()
      },
      onError(error) {
        if (isAxiosError(error)) {
          toast.error((error.response?.data as string) || '')
        }
      }
    })
  }

  return (
    <div className='grid grid-cols-12 rounded-lg border px-6 py-4 shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg'>
      <div className='col-span-6'>
        <div className='flex items-center gap-4'>
          <input
            id='term-checkbox'
            type='checkbox'
            checked={selected.includes(product._id)}
            onChange={() => handleSelectProduct(product._id)}
            className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
          />
          <div className='h-20 w-20 overflow-hidden rounded-lg bg-gray-100'>
            <img src={product.image} alt='' className='h-full w-full object-cover' />
          </div>
          <div className='flex-1'>
            <Link
              to={AppUrls.shopProductDetail(product._id)}
              className='mb-1 line-clamp-1 text-[18px] font-medium text-gray-800 hover:text-primary'
            >
              {product.name}
            </Link>
            <div className='flex flex-wrap items-center gap-2 text-sm text-gray-500 lg:gap-4'>
              <span className='text-sm text-gray-500'>By {product.printBrand}</span>
              <span>{product.variants?.length} sizes</span>
              {/* <span>5 colors</span> */}
            </div>
            <div className='mt-1.5 flex items-center gap-4'>
              <div className='col-span-2 flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full border-2 border-purple-200 bg-primary' />
                <div className='text-sm text-gray-800'>{product.status === 'published' ? 'Publishing' : 'Hiding'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-3 flex items-center justify-end pr-4'>
        <div className='flex min-w-[110px] justify-center'>
          {product.status === 'published' ? (
            <Tooltip content='Unpublish this product'>
              <CustomButton
                type='outline'
                title='UnPublish'
                disabled={storeProductMutation.isLoading}
                customStyles='px-4 py-[4px] md:px-4 md:py-[4px] bg-gray-100 hover:text-white hover:bg-primary hover:opacity-100'
                handleClick={() =>
                  handleChangeProductStatus({ productId: product._id, body: { status: 'unpublished' } })
                }
              />
            </Tooltip>
          ) : (
            <Tooltip content='publish this product'>
              <CustomButton
                type='filled'
                title='Publish'
                disabled={storeProductMutation.isLoading}
                customStyles='px-4 py-[4px] md:px-4 md:py-[4px]'
                handleClick={() => handleChangeProductStatus({ productId: product._id, body: { status: 'published' } })}
              />
            </Tooltip>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className='col-span-4 flex items-center justify-end gap-4 lg:col-span-3'>
        {/* Edit btn */}
        <Tooltip content='Edit product' classStyle='z-10'>
          <Link to={AppUrls.shopProductDetail(product._id)} className='block rounded-lg p-1 hover:bg-gray-200'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
              <path
                fillRule='evenodd'
                d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </Tooltip>
        {/* Copy to stores btn */}
        <Tooltip content='Copy to stores' classStyle='z-10'>
          <div
            className='cursor-pointer rounded-lg p-1 hover:bg-gray-200'
            onClick={() => {
              setListIds([product._id])
              setSelected([])
              setCopyToStore(true)
            }}
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
                d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z'
              />
            </svg>
          </div>
        </Tooltip>
        {/* Create order btn */}
        {/* <Tooltip content='Create order' classStyle='z-10'>
          <div className='cursor-pointer rounded-lg p-1 hover:bg-gray-200'>
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
                d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>
          </div>
        </Tooltip> */}
        {/* Delete btn */}
        <div
          className='z-10 cursor-pointer rounded-lg p-1 text-red-500 hover:bg-gray-200'
          onClick={() => {
            setListIds([product._id])
            setConfirmVisible(true)
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-[22px] w-[22px]'>
            <path
              fillRule='evenodd'
              d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default StoreProductCard
