import React, { useContext, useRef, useState } from 'react'
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
  const { currentStore } = useContext(AppContext)
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
                    <img
                      className='h-12 w-12 rounded-full'
                      src='data:image/png;base64,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'
                      alt=''
                    />
                    <div className=''>
                      <h2 className='text-xl font-semibold text-gray-600'>CustomInk</h2>
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
