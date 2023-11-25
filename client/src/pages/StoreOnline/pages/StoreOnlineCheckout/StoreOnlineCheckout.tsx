import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import storeApi from 'src/apis/store.api'
import { AppUrls } from 'src/config/config'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { PurchaseSchema, UserSchema, purchaseSchema, userSchema } from 'src/utils/rules'
import { generateNameId, isAxiosError } from 'src/utils/utils'
import { CartProductResponse, Product, ProductCartItem } from 'src/types/product.type'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { CustomButton } from 'src/components'
import classNames from 'classnames'
import { SHIPPING__FEE } from 'src/config/constants'
import productApi from 'src/apis/product.api'
import orderApi from 'src/apis/cart.api'
import { OrderBody } from 'src/types/order.type'
import { AppContext } from 'src/context/app.context'
import { toast } from 'react-toastify'
import { removeItemFromCart } from 'src/redux/slices/cartSlice'

type Props = {}

type CheckoutTab = 'contact' | 'shipping'
type FormData = PurchaseSchema

const contactSchema = purchaseSchema

const StoreOnlineCheckout = (props: Props) => {
  const { profile, currentStore } = useContext(AppContext)
  const { checkoutProducts } = useSelector((state: any) => state.cart)

  const [tab, setTab] = useState<CheckoutTab>('contact')
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allProductIds = checkoutProducts ? checkoutProducts?.map((product: ProductCartItem) => `${product._id}`) : []

  const { data, isLoading } = useQuery({
    queryKey: ['list_variants', allProductIds],
    queryFn: () => productApi.getListProductVariants({ listIds: allProductIds }),
    enabled: Boolean(allProductIds.length)
  })
  const productsList: CartProductResponse[] = data?.data?.data

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues
  } = useForm<FormData>({ defaultValues: { country: 'Vietnam' }, resolver: yupResolver<FormData>(contactSchema) })

  const checkoutMutation = useMutation({
    mutationFn: (body: OrderBody) => orderApi.createOrder(currentStore?._id as string, body)
  })
  // const form = getValues()
  // console.log(tab)
  const getQuantity = (id: string) => {
    const item = checkoutProducts.find((prod: ProductCartItem) => prod._id === id)
    return item ? item.quantity : 0
  }

  const totalCartPrice = useMemo(
    () =>
      checkoutProducts && productsList
        ? productsList
            .reduce((total: number, product: CartProductResponse) => {
              return (total += product.retailPrice * getQuantity(product._id))
            }, 0)
            .toFixed(2)
        : 0,
    [checkoutProducts, productsList]
  )

  const onSubmit = handleSubmit(async (data) => {
    try {
      setTab('shipping')
      setValidated(true)
    } catch (error) {
      console.log(error)
      setValidated(false)
    }
  })

  const handleCreateOrder = async () => {
    const body: OrderBody = {
      customerId: profile?._id as string,
      storeId: currentStore?._id as string,
      totalBill: Number(totalCartPrice),
      shippingCost: SHIPPING__FEE,
      status: 'created',
      items: checkoutProducts,
      purchaseInfo: getValues()
    }

    checkoutMutation.mutate(body, {
      onSuccess: (response) => {
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 1000
        })
        dispatch(removeItemFromCart(allProductIds))
        navigate(AppUrls.userOrders)
      },
      onError(error) {
        if (isAxiosError(error)) {
          toast.error((error.response?.data as string) || '')
        }
      }
    })
  }

  const handleCheckout = async () => {
    const products = productsList.map((product) => ({
      ...product,
      quantity: getQuantity(product._id)
    }))
    const { data } = await orderApi.checkoutStripe(
      JSON.stringify({
        items: [
          ...products,
          {
            productId: { name: 'Shipping fee' },
            retailPrice: SHIPPING__FEE,
            quantity: 1
          }
        ]
      })
    )
    window.open(data.url, '_blank')
  }

  return (
    <div className='h-full'>
      <h3 className='text-2xl font-semibold text-gray-800'>Checkout</h3>
      <form onSubmit={onSubmit} className='mt-6 block min-h-full'>
        <div className='grid min-h-full grid-cols-5'>
          {/* left */}
          <div className='col-span-5 h-full p-6 md:col-span-3'>
            {/* stepper */}
            <ol className='flex w-full items-center text-center text-sm font-medium text-gray-500 sm:text-base'>
              <li
                className={classNames(
                  "after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-400 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10",
                  { 'text-primary': validated, 'after:border-primary': validated }
                )}
              >
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                  {!validated ? (
                    <span className='mr-2'>1</span>
                  ) : (
                    <svg
                      className='mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                    </svg>
                  )}
                  Contact
                </span>
              </li>
              <li
                className={classNames(
                  "after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-400 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10",
                  { 'text-primary': validated, 'after:border-primary': validated }
                )}
              >
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                  {!validated ? (
                    <span className='mr-2'>2</span>
                  ) : (
                    <svg
                      className='mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                    </svg>
                  )}
                  Shipping
                </span>
              </li>
              <li className='flex items-center'>
                <span className='mr-2'>3</span>
                Confirmation
              </li>
            </ol>

            <div className='mt-6'>
              {tab === 'contact' ? (
                <>
                  {/* Contact form */}
                  <div className='w-full'>
                    <h3 className='mb-3 font-semibold text-gray-900'>Contact information</h3>
                    <div className='flex w-full flex-col gap-3 md:flex-row'>
                      <Input
                        className='group flex-1'
                        id='full_name'
                        name='fullName'
                        label='Full name'
                        register={register}
                        errorMessage={errors.fullName?.message}
                        classNameInput='border w-full peer block appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                      />
                      <Input
                        className='group flex-1'
                        id='phone_number'
                        name='phoneNumber'
                        label='Phone number'
                        register={register}
                        errorMessage={errors.phoneNumber?.message}
                        classNameInput='border w-full peer block appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                      />
                    </div>
                  </div>
                  {/* Address */}
                  <div className='w-full'>
                    <h3 className='mb-3 font-semibold text-gray-900'>Address</h3>
                    <div className='flex w-full flex-col gap-3 md:flex-row'>
                      <Controller
                        control={control}
                        name='country'
                        render={({ field }) => (
                          <div className='relative flex-1'>
                            <label
                              htmlFor='country'
                              className='absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 placeholder-shown:top-1/2 placeholder-shown:-translate-y-1/2 placeholder-shown:scale-100 focus:top-2 focus:-translate-y-4 focus:scale-75 focus:px-2 focus:text-primary'
                            >
                              Country
                            </label>
                            <select
                              // type='select'
                              id='country'
                              value={field.value}
                              onChange={field.onChange}
                              // name='country'
                              className='peer relative block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                            >
                              {/* <div className='absolute right-0 top-full bg-white shadow-lg'> */}
                              <option value='Vietnam'>Vietnam</option>
                              <option value='Thailan'>Thailan</option>
                              <option value='USA'>USA</option>
                              {/* </div> */}
                            </select>
                            <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.country?.message}</div>
                          </div>
                        )}
                      />
                      <Input
                        className='group flex-1'
                        id='province'
                        name='province'
                        label='Province'
                        register={register}
                        errorMessage={errors.province?.message}
                        classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                      />
                    </div>
                    <div className='mt-2 flex w-full flex-col gap-3 md:flex-row'>
                      <Input
                        className='group flex-1'
                        id='district'
                        label='District'
                        name='district'
                        register={register}
                        errorMessage={errors.district?.message}
                        classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                      />
                      <Input
                        className='group flex-1'
                        id='ward'
                        label='Ward'
                        name='ward'
                        register={register}
                        errorMessage={errors.ward?.message}
                        classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                      />
                    </div>

                    <Input
                      className='group'
                      id='address_line_1'
                      name='addressDetail'
                      label='Address detail'
                      register={register}
                      errorMessage={errors.addressDetail?.message}
                      classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
                    />
                  </div>
                  <div className='mt-8 flex justify-end'>
                    <CustomButton
                      title='Next: Shipping'
                      type='filled'
                      isSubmitButton={true}
                      // isLoading={updateAccountMutation.isLoading}
                      // disabled={updateAccountMutation.isLoading}
                      customStyles={`mr-1 rounded-lg border-[1px] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 md:mr-2`}
                    />
                  </div>
                </>
              ) : (
                // Shipping
                <>
                  <div className='w-full'>
                    <h3 className='mb-3 font-semibold text-gray-900'>Shipping Address</h3>
                    <div className='flex items-center gap-2'>
                      <div className='flex-1 text-gray-500'>
                        <p className='font-semibold'>{`${getValues('fullName')} -  ${getValues('phoneNumber')}`}</p>
                        <p>
                          {getValues('addressDetail')}
                          {', '}
                          <span className='capitalize'>{getValues('ward')}</span> ward{', '}
                          <span className='capitalize'>{getValues('district')}</span> district{', '}
                          <span className='capitalize'>{getValues('province')}</span>
                          {', '}
                          <span className='capitalize'>{getValues('country')}</span>
                        </p>
                      </div>
                      <div
                        className='cursor-pointer rounded-lg p-2 hover:bg-gray-100'
                        onClick={() => setTab('contact')}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='h-5 w-5'
                        >
                          <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z' />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className='mt-6 w-full'>
                    <h3 className='mb-3 font-semibold text-gray-900'>Shipping Method</h3>
                    <div className='flex items-center justify-between gap-2 rounded-lg border p-6'>
                      <div className='flex items-center gap-3'>
                        <div className='h-5 w-5 rounded-full border-[4px] border-primary'></div>
                        <div className='font-semibold'>Standard</div>
                      </div>
                      <span className='font-semibold text-primary'>{`$ ${SHIPPING__FEE}`}</span>
                    </div>
                  </div>
                  <div className='mt-8 flex justify-between'>
                    <button type='submit' className='hidden'></button>
                    <CustomButton
                      title='Back: Contact'
                      type='outline'
                      // isSubmitButton={false}
                      // isLoading={updateAccountMutation.isLoading}
                      // disabled={updateAccountMutation.isLoading}
                      handleClick={() => setTab('contact')}
                      // customStyles={`mr-1 rounded-lg border-[1px] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 md:mr-2`}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* right */}
          <div className='col-span-5 min-h-full bg-gray-100 p-6 md:col-span-2'>
            <h3 className='text-xl font-semibold text-gray-800'>Products Ordered</h3>
            {isLoading ? (
              <>
                <div className='mt-6 flex flex-col gap-5'>
                  {Array(3)
                    .fill('prod')
                    .map((item, idx) => (
                      <div role='status' key={idx} className='flex animate-pulse gap-4'>
                        <div className='h-14 w-14 bg-gray-300' />
                        <div className='flex flex-col'>
                          <div className='h-6 w-40 rounded-lg bg-gray-300' />
                          <div className='mt-1 h-4 w-10 rounded-lg bg-gray-200' />
                        </div>
                      </div>
                    ))}
                </div>
                <div className='mt-6 flex animate-pulse justify-between border-t border-gray-300 py-6'>
                  <div className='h-6 w-20 bg-gray-300' />
                  <div className='h-6 w-20 bg-gray-300' />
                </div>
              </>
            ) : (
              <>
                <div className='mt-6 flex flex-col gap-5'>
                  {productsList?.length &&
                    productsList.map((product: CartProductResponse) => {
                      // const [id, variantId] = prod.variantId.split('-')
                      // const product = productsList.find((item: Product) => item._id === id)
                      return (
                        <div key={product._id} className='flex gap-4'>
                          <img src={product.productId.image} alt='' className='h-14 w-14 bg-white object-cover' />
                          {/* Details */}
                          <div className='flex flex-1 flex-col justify-between'>
                            <h5 className='font-medium text-gray-600'>{product.productId.name}</h5>
                            <p className='mt-1.5 text-sm text-gray-600'>Size: {product.size}</p>
                          </div>
                          <div className='flex items-center'>
                            <p className='w-max font-medium text-primary'>{`$${
                              getQuantity(product._id) * product.retailPrice
                            }`}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>

                <div className='mt-8 border-t border-gray-300 py-4'>
                  <div className='flex justify-between'>
                    <h5 className='text-gray-500'>{`Merchandise (${checkoutProducts.length} ${
                      checkoutProducts.length > 1 ? 'Items' : 'Item'
                    }):`}</h5>
                    <span className='font-medium tracking-wide text-gray-600'>${totalCartPrice}</span>
                  </div>

                  <div className='mt-2 flex justify-between'>
                    <h5 className='text-gray-500'>Shipping fee:</h5>
                    <span className='font-medium tracking-wide text-gray-600'>
                      {validated ? `$${SHIPPING__FEE}` : <span className='text-sm'>Calculated at shipping step</span>}
                    </span>
                  </div>
                </div>

                <div className='flex justify-between border-t border-gray-300 py-6'>
                  <h3 className='text-xl font-semibold tracking-wide text-gray-800'>Total Payment:</h3>
                  <h3 className='text-2xl font-semibold tracking-wide text-primary'>
                    $
                    {validated
                      ? (Number(totalCartPrice) + Number(SHIPPING__FEE)).toFixed(2)
                      : Number(totalCartPrice).toFixed(2)}
                  </h3>
                </div>

                {validated && tab === 'shipping' && (
                  <div className='flex justify-end border-t border-gray-300 py-8'>
                    <CustomButton
                      type='filled'
                      title='Place Order'
                      isSubmitButton={false}
                      handleClick={handleCheckout}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default StoreOnlineCheckout
