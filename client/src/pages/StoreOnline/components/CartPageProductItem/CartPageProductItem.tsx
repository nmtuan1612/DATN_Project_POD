import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import { AppUrls } from 'src/config/config'
import { addToCart, removeItemFromCart, decreaseQuantity } from 'src/redux/slices/cartSlice'
import { CartProductResponse, Product, ProductCartItem, ProductVariant } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'

type Props = {
  product: CartProductResponse
  quantity: number
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
  setTotalBill: React.Dispatch<React.SetStateAction<number>>
}

const CartPageProductItem = ({ product, quantity, selected, setSelected, setTotalBill }: Props) => {
  const [localQuantity, setLocalQuantity] = useState(quantity || 1)

  const dispatch = useDispatch()

  const handleSelectProduct = () => {
    if (selected.includes(product._id)) {
      setTotalBill((prev) => prev - product.retailPrice * quantity)
    } else {
      setTotalBill((prev) => prev + product.retailPrice * quantity)
    }
    setSelected((prev) =>
      prev.includes(product._id) ? prev.filter((item) => item !== product._id) : [...prev, product._id]
    )
  }

  const handleIncreaseQuantity = () => {
    setLocalQuantity((prev) => prev + 1)
    dispatch(addToCart({ _id: product._id, quantity: 1 }))
  }

  const handleDecreaseQuantity = () => {
    setLocalQuantity((prev) => prev - 1)
    dispatch(decreaseQuantity({ _id: product._id }))
  }

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart([product._id]))
    toast.error('Product deleted from cart!', { position: 'top-center', autoClose: 1000 })
  }

  return (
    <div>
      {!product ? (
        <div role='status' className='flex animate-pulse gap-4'>
          <div className='h-20 w-20 bg-gray-300' />
          <div className='flex flex-col'>
            <div className='h-6 rounded-lg bg-gray-300' />
            <div className='mt-1 h-4 w-[50%] rounded-lg bg-gray-200' />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-12 gap-4 border px-6 py-4 transition-all duration-300 hover:bg-gray-50'>
          {/* col 1 */}
          <div className='col-span-4'>
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id='term-checkbox'
                  type='checkbox'
                  checked={selected.includes(product._id)}
                  onChange={handleSelectProduct}
                  className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
                />
              </div>
              <img src={product.productId.image} alt='' className='h-20 w-20 bg-gray-100 object-cover' />
              {/* Details */}
              <div className='flex flex-1 flex-col justify-start'>
                <h5 className='font-medium text-gray-600'>{product.productId.name}</h5>
                <div className='mt-3'>
                  <p className='line-clamp-1 text-xs text-gray-500'>
                    {product.productId.description.replace('<p>', '')}
                  </p>
                  {/* <p className='mt-1.5 text-sm text-primary'>
                    {productCart.quantity} x ${product.price}
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          {/* col 2 */}
          <div className='col-span-2'>
            <div className='flex h-full flex-col items-center justify-center'>
              <p className='text-sm text-gray-500'>Variations:</p>
              <p className='w-max text-sm font-medium text-gray-600'>Size: {product.size}</p>
            </div>
          </div>

          {/* col 3 */}
          <div className='col-span-2'>
            <div className='flex h-full flex-col items-center justify-center'>
              <p className='text-sm text-gray-500'>Unit price:</p>
              <p className='w-max text-sm font-medium text-gray-600'>${product.retailPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* col 4 */}
          <div className='col-span-4'>
            <div className='flex h-full items-center justify-between'>
              {/* quantity */}
              <div className='flex items-center gap-4'>
                <button
                  disabled={quantity === 1}
                  className='rounded-sm border-0 bg-gray-100 p-1 text-gray-700 outline-0 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-700'
                  onClick={handleDecreaseQuantity}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
                  </svg>
                </button>
                <span>{localQuantity}</span>
                <button
                  className='rounded-sm border-0 bg-gray-100 p-1 text-gray-700 outline-0 hover:border-primary hover:text-primary'
                  onClick={handleIncreaseQuantity}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                  </svg>
                </button>
              </div>
              {/* total */}
              <div className='flex flex-col items-center justify-center'>
                <p className='text-sm text-gray-500'>Total price:</p>
                <p className='w-max text-sm font-medium text-primary'>${(product.retailPrice * quantity).toFixed(2)}</p>
              </div>
              {/* delete */}
              <span onClick={handleRemoveItem}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-[22px] w-[22px] cursor-pointer text-red-500 hover:text-red-700'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPageProductItem
