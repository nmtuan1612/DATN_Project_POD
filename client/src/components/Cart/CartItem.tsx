import { Link } from 'react-router-dom'
import { AppUrls } from 'src/config/config'
import { CartProductResponse } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'

type Props = {
  product: CartProductResponse
  quantity: number
}

const CartItem = ({ product, quantity }: Props) => {
  return (
    <div>
      <Link
        to={AppUrls.shopOnlineProductDetail(
          generateNameId({ name: product.productId.name, id: product.productId._id })
        )}
        className='flex gap-4'
      >
        <img src={product.productId.image} alt='' className='h-20 w-20 bg-gray-100 object-cover' />
        {/* Details */}
        <div className='flex flex-1 flex-col justify-between'>
          <h5 className='font-medium text-gray-600'>{product.productId.name}</h5>
          <div className=''>
            <p className='line-clamp-1 text-xs text-gray-500'>{product.productId.description.replace('<p>', '')}</p>
            <p className='mt-1.5 text-sm text-primary'>
              {quantity} x ${product.retailPrice}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          <p className='w-max text-sm font-medium text-gray-600'>Size: {product.size}</p>
        </div>
        {/* <div className='flex cursor-pointer items-center text-red-500 hover:text-red-700'>
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
          </div> */}
      </Link>
    </div>
  )
}

export default CartItem
