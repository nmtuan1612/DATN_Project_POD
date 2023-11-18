import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductsListEmpty from 'src/components/ProductsListEmpty/ProductsListEmpty'
import { fadeAnimation } from 'src/config/motion'
import path from 'src/config/path'
import { CartProductResponse, ProductCartItem } from 'src/types/product.type'
import './Cart.scss'
import CartItem from './CartItem'

type Props = {}

const Cart = (props: Props) => {
  const { products } = useSelector((state: any) => state.cart)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const allVariantIds = products ? products?.map((product: ProductCartItem) => `${product._id}`) : []

  const { data, isLoading } = useQuery({
    queryKey: ['list_variants', allVariantIds],
    queryFn: () => productApi.getListProductVariants({ listIds: allVariantIds }),
    enabled: Boolean(allVariantIds?.length),
    staleTime: 5 * 1000
  })
  const productsList: CartProductResponse[] = data?.data?.data

  const getQuantity = (id: string) => {
    const item = products.find((prod: ProductCartItem) => prod._id === id)
    return item ? item.quantity : 0
  }

  return (
    <div className='group relative cursor-pointer'>
      {/* Icon */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.7}
        stroke='currentColor'
        className='h-7 w-7 hover:text-primary'
        onClick={() =>
          pathname.includes(path.shopOnline)
            ? navigate(path.shopOnlineCart)
            : navigate(path.userCart, { replace: true })
        }
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
        />
      </svg>
      <div className='absolute -right-2.5 -top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-semibold text-white'>
        {products?.length}
      </div>

      {/* Cart list */}
      <AnimatePresence>
        <motion.div {...fadeAnimation} className='cart__wrapper absolute right-0 top-full hidden group-hover:block'>
          <div className='z-20 mt-2 w-[90vw] rounded-md bg-white p-5 shadow-around md:w-[400px] md:max-w-[400px]'>
            <h4 className='text-[18px] font-medium text-gray-800'>Products in your cart</h4>
            {!products?.length ? (
              <ProductsListEmpty title="No product found. Let's shop!" />
            ) : (
              <>
                <div className='mt-6 flex flex-col gap-4'>
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
                    : productsList?.map((product: CartProductResponse) => (
                        <CartItem key={product._id} product={product} quantity={getQuantity(product._id)} />
                      ))}
                </div>
                <div className='mt-3 flex justify-end'>
                  <Link
                    to={pathname.includes(path.shopOnline) ? path.shopOnlineCart : path.userCart}
                    className='button__link w-fit'
                  >
                    View cart
                  </Link>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Cart
