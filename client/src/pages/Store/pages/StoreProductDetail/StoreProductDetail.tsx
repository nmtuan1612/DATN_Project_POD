import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Editor } from '@tinymce/tinymce-react'
import { isEqual, set } from 'lodash'
import { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import { CustomButton } from 'src/components'
import Input from 'src/components/Input'
import Loading from 'src/components/Loading/Loading'
import Table from 'src/components/Table/Table'
import { AppUrls } from 'src/config/config'
import { AppContext } from 'src/context/app.context'
import useMyStores from 'src/hooks/useMyStores'
import { Product, ProductVariant } from 'src/types/product.type'
import { ProductSchema, productSchema } from 'src/utils/rules'
import { generateProductVariants, isAxiosError } from 'src/utils/utils'
import PricingTable from '../../components/PricingTable/PricingTable'
import { FULL__TEXTURE__FEE, LOGO__FEE, PROFIT__MARGIN, SHIPPING__FEE, UP__SIZE__FEE } from 'src/config/constants'

type Props = {}

const StoreProductDetail = (props: Props) => {
  const { currentStore } = useContext(AppContext)
  const { storeList } = useMyStores()

  const [dirty, setDirty] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState<string[]>([])
  const [variants, setVariants] = useState<ProductVariant[] | undefined>(undefined)

  const { productId } = useParams()
  // const product: Product = productMockData
  const descriptionRef: any = useRef(null)
  const detailRef: any = useRef(null)
  const navigate = useNavigate()
  const { state: routeState } = useLocation()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [productId],
    queryFn: () => productApi.getStoreProductWithId(productId as string),
    staleTime: 20 * 1000
  })
  const product: Product = data?.data?.data

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
    watch
  } = useForm<ProductSchema>({
    defaultValues: { storeIds: [currentStore?._id], status: ['unpublished'] },
    resolver: yupResolver<ProductSchema>(productSchema)
  })

  const storeIds = watch('storeIds')
  const name = watch('name')

  const storeProductMutation = useMutation({
    mutationFn: (body: any) => productApi.updateStoreProduct(productId as string, body)
  })

  useEffect(() => {
    if (product) {
      setValue('name', product.name)
      setValue('description', product.description)
      // setValue('details', convertDetailToHtml())
      setValue('details', product.details[0])
      setValue('status', [product.status])

      const listIds =
        product.variants?.reduce(
          (list: string[], item) => (item.isPublished ? [...list, item._id as string] : list),
          []
        ) || []
      setSelectedVariants(listIds)
      setVariants(product.variants)
    }
  }, [product])

  useEffect(() => {
    if (routeState && routeState.productType === 'newProduct' && currentStore) {
      setValue('storeIds', [currentStore?._id])
    }
  }, [currentStore])

  useEffect(() => {
    if (product) {
      ;(!isEqual(storeIds, product.storeId) || name !== product.name) && setDirty(true)
    }
  }, [storeIds, name])

  const reverseHtmlToDetail = (detailString: string) => {
    const details = detailString
      .split('<li>')
      .map((detail) => detail.replace('</li>', ''))
      .filter((detail) => detail)
    return details
  }

  const onSave = handleSubmit(async (data) => {
    // reverseHtmlToDetail(data.details as string)
    const { _id, variants: variantsData, storeId: store, ...otherDetails } = product

    if (variants?.length) {
      const newVariants: ProductVariant[] = variants.map((variant, index) =>
        selectedVariants.includes(variant._id) ? { ...variant, isPublished: true } : { ...variant, isPublished: false }
      )
      await productApi.updateProductVariants({ variants: newVariants })
    }

    if (routeState && routeState.productType === 'newProduct') {
      for (const storeId of data.storeIds.filter((id) => id !== store._id)) {
        const newProduct = await productApi.addStoreProduct({
          ...otherDetails,
          ...data,
          status: data.status?.[0],
          storeId,
          details: [data.details],
          variants: []
        })
        const productId = newProduct?.data?.data?._id
        if (productId) {
          const newVariants = variants
            ? variants.map((variant) => {
                const { _id, ...otherDetails } = variant
                return {
                  ...otherDetails,
                  productId,
                  sku: `${_id}-${variant.size}`
                }
              })
            : generateProductVariants({
                _id: productId,
                price: product.price,
                sizeGuides: product.sizeGuides,
                printAreas: product.printAreas
              })
          await productApi.addProductVariants({ variants: newVariants })
        }
      }
    }

    storeProductMutation.mutateAsync(
      {
        ...otherDetails,
        ...data,
        status: data.status?.[0],
        storeId: store._id,
        details: [data.details],
        variants: selectedVariants
      },
      {
        onSuccess(data) {
          toast.success(data.data?.message, { autoClose: 1000 })
          refetch()
          navigate(AppUrls.shopManageProducts(currentStore?._id as string))
        },
        onError(error) {
          if (isAxiosError(error)) {
            toast.error((error.response?.data as string) || '')
          }
        }
      }
    )
  })

  const onCancel = () => {
    navigate(AppUrls.shopManageProducts(currentStore?._id as string))
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className=''>
        <Link
          to={AppUrls.shopManageProducts(currentStore?._id as string)}
          className='button__link w-fit cursor-pointer text-sm'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
            <path
              fillRule='evenodd'
              d='M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z'
              clipRule='evenodd'
            />
          </svg>
          My products
        </Link>
      </div>
      {isLoading || storeProductMutation.isLoading ? (
        <Loading />
      ) : product ? (
        <>
          <h2 className='tab__title text-gray-600'>{product.name}</h2>
          <form onSubmit={onSave} className='flex flex-col gap-5'>
            {/* Design */}
            <div className='rounded-lg px-6'>
              <h3 className='mb-2 block text-xl font-semibold text-gray-600'>Design</h3>
              <div className='grid grid-cols-8 md:grid-cols-10'>
                <div className='col-span-2'>
                  <img
                    src={product.image || ''}
                    alt='thumbnail'
                    className='aspect-square w-full overflow-hidden rounded-md border object-cover'
                  />
                  <Link
                    to={AppUrls.customProduct(product._id)}
                    state={{ productType: 'storeProduct' }}
                    className='button__link mt-4 justify-center'
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
                        d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
                      />
                    </svg>
                    Edit design
                  </Link>
                </div>
                <div className='col-span-6 px-6 md:col-span-8'>
                  <h3 className='text-[18px] text-base font-medium text-gray-600'>Thumbnail and mockup images</h3>
                  <div className='mt-4 flex items-center gap-3'>
                    <div className=''>
                      <img
                        src={
                          product.image ||
                          'https://images.printify.com/mockup/64f4e228add9bc118c06c4eb/93541/78839?s=400&t=1693770280000'
                        }
                        alt='thumbnail'
                        className='aspect-square w-28 overflow-hidden rounded-md border object-cover'
                      />
                      <p className='mt-2 text-center text-sm'>Front</p>
                    </div>
                    <div className=''>
                      <img
                        src={product?.otherImages?.[product?.otherImages?.length - 1] || ''}
                        alt='thumbnail'
                        className='aspect-square w-28 overflow-hidden rounded-md border object-cover'
                      />
                      <p className='mt-2 text-center text-sm'>Back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Details */}
            <div className='rounded-lg px-6'>
              <h3 className='mb-5 block text-xl font-semibold text-gray-600'>Details</h3>
              {/* name */}
              <div className='mb-1'>
                <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
                  Product name <span className='text-sm text-red-600'>*</span>
                </label>
                <Input
                  className='group'
                  id='name'
                  name='name'
                  register={register}
                  classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                />
              </div>
              {/* description */}
              <div className='mb-1'>
                <label htmlFor='description' className='mb-2 block font-medium text-gray-700'>
                  Description <span className='text-sm text-red-600'>*</span>
                </label>
                <Controller
                  control={control}
                  name='description'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Editor
                      apiKey='qtddag6ycqpvepnme49mh4uwzox30c9dldg780iccg630cam'
                      onInit={(evt, editor) => (descriptionRef.current = editor)}
                      // textareaName='description'
                      id='description'
                      // initialValue={`<p>${product.description}</p>`}
                      init={{
                        height: 220,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                          'advlist',
                          'autolink',
                          'lists',
                          'link',
                          'image',
                          'charmap',
                          'anchor',
                          'searchreplace',
                          'visualblocks',
                          'code',
                          'fullscreen',
                          'insertdatetime',
                          'media',
                          'table',
                          'code',
                          'help'
                        ],
                        toolbar:
                          'undo redo | blocks | ' +
                          'bold italic forecolor | bullist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                      value={value}
                      onDirty={() => setDirty(true)}
                      onEditorChange={onChange}
                    />
                  )}
                />
                <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.description?.message}</p>

                <label htmlFor='description' className='mb-2 block font-medium text-gray-700'>
                  Details <span className='text-sm text-red-600'>*</span>
                </label>
                <Controller
                  control={control}
                  name='details'
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Editor
                      apiKey='qtddag6ycqpvepnme49mh4uwzox30c9dldg780iccg630cam'
                      onInit={(evt, editor) => (detailRef.current = editor)}
                      // textareaName='details'
                      id='details'
                      // initialValue={convertDetailToHtml()}
                      init={{
                        height: 220,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                          'advlist',
                          'autolink',
                          'lists',
                          'link',
                          'charmap',
                          'anchor',
                          'searchreplace',
                          'visualblocks',
                          'fullscreen',
                          'insertdatetime',
                          'help'
                        ],
                        toolbar: 'undo redo | ' + 'bold italic forecolor | ' + 'bullist removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                      value={value}
                      onDirty={() => setDirty(true)}
                      onEditorChange={onChange}
                    />
                  )}
                />
                <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.details?.message}</p>
                {/* <textarea
                  id='store-desc'
                  cols={30}
                  rows={8}
                  {...register('description')}
                  placeholder='Your store description...'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                />
                <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.description?.message}</p> */}
              </div>
            </div>
            {/* Variants */}
            <div className='mb-6 rounded-lg px-6'>
              <h3 className='mb-5 block text-xl font-semibold text-gray-600'>Variants</h3>
              <div className='mb-1'>
                <h3 className='mb-4 flex  items-center gap-2 text-sm italic text-gray-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-5 w-5 text-primary'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Select product's variants for sell at online store <br />
                </h3>
                <label htmlFor='' className='mb-0 block font-semibold text-gray-700'>
                  Pricing
                </label>
              </div>
              {variants && (
                <PricingTable
                  selected={selectedVariants}
                  setSelected={setSelectedVariants}
                  variants={variants}
                  setVariants={setVariants}
                />
              )}
            </div>
            {/* Publishing settings */}
            <div className='px-6'>
              <h3 className='mb-5 block text-xl font-semibold text-gray-600'>Publishing settings</h3>
              <div className='flex flex-col gap-2'>
                <span className='block font-medium text-gray-700'>Product visibility</span>

                <div className='flex flex-col gap-4 pl-6'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id='product-visibility'
                      value={'published'}
                      {...register('status')}
                      className='h-4 w-4 rounded border-gray-300 bg-gray-100 checked:bg-primary focus:ring-0'
                    />
                    <label htmlFor={`product-visibility`} className='text-gray-900'>
                      Publish in store
                    </label>
                  </div>
                </div>
              </div>
              {routeState && routeState.productType === 'newProduct' && (
                <div className='mt-4 flex flex-col gap-2'>
                  <span className='block font-medium text-gray-700'>
                    Select store <span className='text-sm text-red-600'>*</span>
                  </span>

                  {storeList && (
                    <div className='flex flex-col gap-4 pl-6'>
                      {storeList.map((store) => (
                        <div className='flex items-center gap-2' key={store._id}>
                          <input
                            id={`checkbox-${store._id}`}
                            type='checkbox'
                            value={store._id}
                            {...register('storeIds')}
                            // checked={storeIds?.includes(store._id)}
                            className='h-4 w-4 rounded border-gray-300 bg-gray-100 checked:bg-primary focus:ring-0'
                          />
                          <label htmlFor={`checkbox-${store._id}`} className='text-sm font-medium text-gray-900'>
                            {store.storeName}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.storeIds?.message}</p>
                </div>
              )}
            </div>

            {/* footer */}
            <div className='mt-2 flex items-center justify-end px-6'>
              <CustomButton
                title='Cancel'
                type='outline'
                handleClick={onCancel}
                customStyles='mr-1 text-gray-800 hover:bg-gray-50 focus:outline-none md:mr-2'
              />
              <CustomButton
                type='filled'
                title='Save'
                isSubmitButton={true}
                isLoading={storeProductMutation.isLoading}
                disabled={storeProductMutation.isLoading || !dirty}
                customStyles=''
              />
            </div>
          </form>
        </>
      ) : (
        'Error'
      )}
    </div>
  )
}

export default StoreProductDetail
