import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { CustomButton } from 'src/components'
import InputSearch from 'src/components/InputSearch/InputSearch'
import ProductCard from 'src/components/ProductCard/ProductCard'
import Table from 'src/components/Table/Table'
import { AppUrls } from 'src/config/config'
import { sampleProductMockData } from 'src/config/mockData'
import { Product, SampleProduct, SampleProductDetail } from 'src/types/product.type'
import Slider from 'react-slick'
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from 'src/config/motion'
import { useQuery } from '@tanstack/react-query'
import { formatNumberToSocialStyle, generateNameId, getIdFromNameId } from 'src/utils/utils'
import productApi from 'src/apis/product.api'
import Loading from 'src/components/Loading/Loading'
import classNames from 'classnames'
import addToCartIcon from 'src/assets/add-to-cart.svg'
import { AppContext } from 'src/context/app.context'
import ProductRating from 'src/components/ProductRating/ProductRating'
import { useDispatch } from 'react-redux'
import { addToCart } from 'src/redux/slices/cartSlice'
import { toast } from 'react-toastify'

type Props = {}

const StoreOnlineProductDetail = (props: Props) => {
  const { currentStore, setCurrentStore, profile } = useContext(AppContext)
  const [relatedProducts, setRelatedProducts] = useState<SampleProduct[]>(Array(10).fill(sampleProductMockData))

  const [showProviderDetail, setShowProviderDetail] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [sizeSelected, setSizeSelected] = useState('')
  const [selectedImage, setSelectedImage] = useState<{ type: 'mainImg' | 'otherImg'; id: any }>({
    type: 'mainImg',
    id: 0
  })

  const aboutRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { productId } = useParams()

  const dispatch = useDispatch()

  const { data, isLoading } = useQuery({
    queryKey: ['product', getIdFromNameId(productId as string)],
    queryFn: () => productApi.getStoreProductWithId(getIdFromNameId(productId as string)),
    staleTime: 2 * (60 * 1000)
  })
  const product: Product = data?.data?.data
  const productImages = product?.otherImages?.length ? [product?.image, ...product?.otherImages] : [product?.image]

  useEffect(() => {
    if (product && product.storeId?._id !== currentStore?._id) {
      setCurrentStore(product.storeId)
    }
  }, [product])
  const handleViewAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const settings = {
    autoplay: true,
    arrows: true,
    dots: true,
    speed: 500,
    // centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const computePriceByVariant = ({ variants }: Pick<Product, 'variants'>) => {
    if (sizeSelected) {
      const variant = variants?.find((item) => item._id === sizeSelected)
      return variant ? variant.retailPrice : variants?.[0].retailPrice
    } else return variants?.[0].retailPrice
  }

  const handleAddToCart = () => {
    if (sizeSelected) {
      dispatch(addToCart({ quantity, _id: sizeSelected }))
      setQuantity(1)
      setSizeSelected('')
      toast.success('Product added to cart!', { position: 'top-right', autoClose: 1000 })
    } else {
      toast.error('Please select size!', { position: 'top-center' })
    }
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading />
      ) : (
        <motion.section {...fadeAnimation} className='grid grid-cols-6 gap-6 overflow-scroll xl:gap-7'>
          {/* <motion.div {...slideAnimation('down')} className='col-span-6 h-fit'>
            <InputSearch />
          </motion.div> */}
          {/* <motion.div {...slideAnimation('down')} className='col-span-6'>
            <BreadCrumbs />
          </motion.div> */}
          {product && (
            <>
              {/* Images */}
              <motion.div
                {...slideAnimation('left')}
                className='col-span-6 grid overflow-hidden lg:col-span-3 lg:grid-cols-12 lg:gap-2'
              >
                <div className='col-span-1 flex gap-4 overflow-scroll lg:col-span-2 lg:flex-col lg:gap-2'>
                  {productImages.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={image}
                      className={classNames('aspect-square w-full bg-[#f7f7f7] object-cover', {
                        'rounded-sm lg:border lg:border-x-[1px] lg:border-y-[1px] lg:border-primary':
                          index === selectedImage.id
                      })}
                      onClick={() => setSelectedImage({ type: 'otherImg', id: index })}
                    />
                  ))}
                </div>
                <div className='hidden lg:col-span-10 lg:block'>
                  <img
                    src={selectedImage.type !== 'mainImg' ? productImages[selectedImage.id] : productImages[0]}
                    alt='mainImg'
                    className='aspect-square w-full bg-[#f7f7f7] object-cover'
                  />
                </div>
              </motion.div>

              {/* Details */}
              <motion.div
                {...slideAnimation('right')}
                className='col-span-6 flex flex-col justify-start gap-8 lg:col-span-3'
              >
                <div className='flex flex-col gap-4'>
                  {/* <span className='block text-base text-gray-400'>{product?.type?.name}</span> */}
                  <h2 className='text-3xl font-semibold text-gray-900'>{product?.name}</h2>
                  <h3 className='text-2xl text-primary'>$ {computePriceByVariant({ variants: product.variants })}</h3>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center text-primary'>
                      <span className='mr-1 border-b border-primary'>{product.rating}</span>
                      <ProductRating rating={product.rating || 5} />
                    </div>
                    <div className='h-4 border-r-2' />
                    <div className='flex items-center gap-1'>
                      <span>{formatNumberToSocialStyle(product.sold)}</span>
                      <span className='text-sm text-gray-500'>Sold</span>
                    </div>
                  </div>
                </div>

                {/* Select size */}
                <div className='flex items-center items-baseline gap-6'>
                  <span className='min-w-[70px] font-medium text-gray-600'>Size</span>
                  <div className='flex flex-wrap items-start gap-2'>
                    {product.variants?.map((variant) =>
                      variant.isPublished ? (
                        <button
                          key={variant._id}
                          className={classNames(
                            'rounded-sm border bg-gray-50 px-4 py-1 text-sm text-gray-500 outline-0 hover:opacity-70',
                            {
                              'border-primary text-primary': variant._id === sizeSelected
                            }
                          )}
                          onClick={() => setSizeSelected(variant._id)}
                        >
                          {variant.size}
                        </button>
                      ) : (
                        ''
                      )
                    )}
                  </div>
                </div>

                {profile?._id !== product.storeId?.ownerId && (
                  <>
                    {/* Quantity */}
                    <div className='flex items-center gap-6'>
                      <span className='min-w-[70px] font-medium text-gray-600'>Quantity</span>
                      <div className='flex items-center gap-4'>
                        <button
                          disabled={quantity === 1}
                          className='rounded-sm border-0 bg-gray-100 p-1 text-gray-700 outline-0 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-700'
                          onClick={() => setQuantity((prev) => prev - 1)}
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
                        <span>{quantity}</span>
                        <button
                          className='rounded-sm border-0 bg-gray-100 p-1 text-gray-700 outline-0 hover:border-primary hover:text-primary'
                          onClick={() => setQuantity((prev) => prev + 1)}
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
                    </div>

                    {/* Buttons */}
                    <div className='flex items-center gap-6'>
                      <span
                        className='text-md flex cursor-pointer items-center gap-2 font-medium text-primary hover:text-purple-300'
                        onClick={handleViewAbout}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='h-5 w-5'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                          />
                        </svg>
                        Add to wish list
                      </span>
                      <CustomButton
                        title={
                          <>
                            <img src={addToCartIcon} alt='ad to cart' className='mr-2' />
                            Add to cart
                          </>
                        }
                        type='filled'
                        handleClick={
                          handleAddToCart
                          // () => navigate(AppUrls.customProduct(generateNameId({ name: product.name, id: product._id })))
                        }
                      />
                    </div>
                  </>
                )}

                <div className='mt-10'>
                  <p className='text-sm capitalize italic tracking-wide text-gray-400'>
                    {`Categories: `}
                    {product.categoryIds.map((category, idx) => (
                      <Link
                        key={category}
                        to={{
                          pathname: AppUrls.shopOnlineDetail(currentStore?._id as string),
                          search: createSearchParams({ categoryId: category }).toString()
                        }}
                        className='hover:text-primary'
                      >
                        {`${category.replace('-clothes', '')}${idx === product.categoryIds.length - 1 ? '' : ', '}`}
                      </Link>
                    ))}
                  </p>
                  {/* <p className='text-sm capitalize italic tracking-wide text-gray-400'>
                    Tag:{' '}
                    <Link to={AppUrls.categoryFeatured(product.hiddenTag)} className='hover:text-primary'>
                      {product.hiddenTag}
                    </Link>
                  </p> */}
                </div>
              </motion.div>

              {/* Providers */}
              <motion.div
                {...slideAnimation('up')}
                className='col-span-6 flex flex-col rounded-lg border border-gray-200 bg-[#f8f8f8]'
              >
                {/* header */}
                <div className='flex items-center justify-between border-b-[1px] border-gray-200 px-6 py-4'>
                  <div className='flex gap-2'>
                    <img className='h-12 w-12 rounded-full' src={product.storeId?.logo} alt='' />
                    <div className=''>
                      <h2 className='text-xl font-semibold text-gray-600'>{product.storeId?.storeName}</h2>
                      <div className='flex w-fit items-center gap-1 rounded-lg bg-slate-600 px-2 text-base font-semibold text-white'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-4 w-4'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                            clipRule='evenodd'
                          />
                        </svg>
                        8.5
                      </div>
                    </div>
                  </div>
                  {/* info */}
                  <div className='flex flex-1 justify-around px-6 py-2'>
                    <div className='flex w-fit flex-col items-center justify-start gap-1'>
                      <h3 className='text-sm text-gray-400'>Location</h3>
                      <img
                        src='https://cdn-icons-png.flaticon.com/512/323/323319.png'
                        alt=''
                        className='h-6 w-6 rounded-full'
                      />
                    </div>
                    <div className='flex w-fit flex-col justify-start gap-1'>
                      <h3 className='text-sm text-gray-400'>Shipping</h3>
                      <p className='text-md text-gray-900'>Standard from $6.5</p>
                    </div>
                    <div className='flex w-fit flex-col items-center justify-start gap-1'>
                      <h3 className='text-sm text-gray-400'>Production time</h3>
                      <p className='text-md text-gray-900'>1 working day</p>
                    </div>
                  </div>
                  <CustomButton
                    title='View details'
                    type='outline'
                    handleClick={() => {
                      setShowProviderDetail(true)
                    }}
                  />
                </div>
              </motion.div>

              <motion.div {...slideAnimation('up')} className='col-span-6'>
                {/* About */}
                <div ref={aboutRef} className='col-span-6 grid grid-cols-6 border-b py-8 text-gray-900'>
                  <h2 className='text-2xl font-semibold lg:col-span-2'>About</h2>
                  <div className='col-span-6 text-base lg:col-span-4'>
                    <p className='text-justify' dangerouslySetInnerHTML={{ __html: product.description }} />
                    <ul
                      dangerouslySetInnerHTML={{ __html: product.details[0].replace('<ul>', '').replace('</ul>', '') }}
                      className='list-disc pl-4'
                    />
                  </div>
                </div>

                {/* Size guide */}
                <div className='col-span-6 grid grid-cols-6 border-b py-8 text-gray-900'>
                  <h2 className='text-2xl font-semibold lg:col-span-2'>Size guide</h2>
                  <div className='col-span-6 lg:col-span-4'>
                    {/* Table */}
                    <Table sizeGuides={product.sizeGuides} />
                  </div>
                </div>
              </motion.div>

              {/* Related products */}

              <h2 className='col-span-6 mt-4 text-2xl font-semibold'>You may like</h2>
              <div
                // className={`col-span-6 mt-4 grid grid-cols-2 gap-3 overflow-scroll md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
                // className={`col-span-6 grid auto-cols-[calc(20%)] grid-flow-col gap-3 overflow-x-scroll`}
                className={`col-span-6 pb-6`}
              >
                <Slider {...settings}>
                  {relatedProducts?.map((item: SampleProduct, idx: number) => (
                    <div className='' key={item._id + idx}>
                      <ProductCard productData={item} />
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default StoreOnlineProductDetail
