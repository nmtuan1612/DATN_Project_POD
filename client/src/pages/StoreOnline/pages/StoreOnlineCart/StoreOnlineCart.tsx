import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import { CartProductResponse, ProductCartItem } from 'src/types/product.type'
import CartItem from '../../../../components/Cart/CartItem'
import CartPageProductItem from '../../components/CartPageProductItem/CartPageProductItem'
import { isEqual, set } from 'lodash'
import { CustomButton } from 'src/components'
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { AppUrls } from 'src/config/config'
import { AppContext } from 'src/context/app.context'
import path from 'src/config/path'
import { addToCheckoutCart } from 'src/redux/slices/cartSlice'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'

type Props = {}

const StoreOnlineCart = (props: Props) => {
  const { currentStore } = useContext(AppContext)
  const { products } = useSelector((state: any) => state.cart)

  const [selected, setSelected] = useState<string[]>([])
  const [totalBill, setTotalBill] = useState<number>(0)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const allVariantIds = products ? products?.map((product: ProductCartItem) => `${product._id}`) : []
  const isSelectedAll = isEqual(selected.sort(), allVariantIds.sort())

  const { data, isLoading } = useQuery({
    queryKey: ['list_variants', allVariantIds],
    queryFn: () => productApi.getListProductVariants({ listIds: allVariantIds }),
    enabled: Boolean(allVariantIds.length),
    staleTime: 5 * 1000
  })

  const productsList: CartProductResponse[] = data?.data?.data

  useEffect(() => {
    if (isSelectedAll && productsList) {
      setTotalBill(
        productsList.length
          ? productsList.reduce((acc, product) => (acc += product.retailPrice * getQuantity(product._id)), 0)
          : 0
      )
    }
  }, [isSelectedAll])

  useEffect(() => {
    selected.length === 0 && setTotalBill(0)
  }, [selected])

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(allVariantIds)
      // setTotalBill(productsList.length ? productsList.reduce((acc, product) => (acc += product.retailPrice), 0) : 0)
    } else {
      setSelected([])
      setTotalBill(0)
    }
  }

  const goToCheckout = () => {
    const checkoutCart = products.filter((prod: ProductCartItem) => selected.includes(prod._id))
    dispatch(addToCheckoutCart(checkoutCart))
    navigate({
      pathname: pathname.includes(path.shopOnline) ? path.shopOnlineCheckout : path.userCheckout,
      search: createSearchParams({ productIds: selected.join(',') }).toString()
    })
  }

  const getQuantity = (id: string) => {
    const item = products.find((prod: ProductCartItem) => prod._id === id)
    return item ? item.quantity : 0
  }

  return (
    <div>
      <div className='flex items-center gap-4'>
        <h2 className='text-2xl font-semibold text-gray-700'>Products in your cart</h2>
        <div className='h-5 border-r-2 border-gray-700' />
        <span className='font-medium'>{products.length} items</span>
      </div>
      {!products?.length ? (
        <ProductsListEmpty
          title={
            <>
              {`No product found. `}
              <Link to={AppUrls.shopOnlineDetail(currentStore?._id as string)} className='text-primary'>
                Let's shop!
              </Link>
            </>
          }
        />
      ) : (
        <div className='mt-6 flex flex-col gap-4'>
          {/* header */}
          <div className='flex items-center'>
            <input
              id='term-checkbox'
              type='checkbox'
              disabled={!products?.length}
              checked={isSelectedAll}
              onChange={(event) => handleSelectAll(event)}
              className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
            />
            <label htmlFor='term-checkbox' className='ml-2 text-base font-medium text-gray-500'>
              {`Select all (${products.length})`}
            </label>
          </div>
          {/* <div className='grid grid-cols-12 gap-4 text-gray-500'>
            <div className='col-span-4'>Product</div>
            <div className='col-span-2' />
            <div className='col-span-2 text-center'>Unit Price</div>
            <div className='col-span-4 flex justify-between'>
              <span>Quantity</span>
              <span>Total Price</span>
              <span>Action</span>
            </div>
          </div> */}

          {/* list */}
          {isLoading
            ? Array(3)
                .fill('')
                .map((_, idx) => (
                  <div role='status' key={idx} className='flex animate-pulse gap-4'>
                    <div className='h-20 w-20 bg-gray-300' />
                    <div className='flex flex-1 flex-col'>
                      <div className='h-6 rounded-lg bg-gray-300' />
                      <div className='mt-1 h-4 w-[50%] rounded-lg bg-gray-200' />
                    </div>
                  </div>
                ))
            : productsList.map((product: CartProductResponse) => (
                <CartPageProductItem
                  key={product._id}
                  product={product}
                  quantity={getQuantity(product._id)}
                  selected={selected}
                  setSelected={setSelected}
                  setTotalBill={setTotalBill}
                />
              ))}

          {/* footer */}
          <div className='sticky bottom-0 bg-white px-6 py-4 shadow-md'>
            <div className='flex items-center justify-between'>
              {/* left side */}
              <div className='flex items-center'>
                <input
                  id='term-checkbox'
                  type='checkbox'
                  disabled={!products?.length}
                  checked={isSelectedAll}
                  onChange={(event) => handleSelectAll(event)}
                  className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
                />
                <label htmlFor='term-checkbox' className='ml-2 text-base font-medium text-gray-500'>
                  {`Select all (${products.length})`}
                </label>
              </div>

              {/* right side */}
              <div className=''>
                <div className='flex items-center gap-3'>
                  <h4>{`Total (${selected.length} ${selected.length > 1 ? 'items' : 'item'})`}</h4>
                  <h3 className='text-2xl tracking-wide text-primary'>${totalBill?.toFixed(2)}</h3>

                  <CustomButton
                    type='filled'
                    title='Checkout'
                    customStyles='px-8 md:px-8'
                    disabled={!Boolean(selected.length)}
                    handleClick={goToCheckout}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreOnlineCart
