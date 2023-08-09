import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from 'src/components'
import InputSearch from 'src/components/InputSearch/InputSearch'
import ProductCard from 'src/components/ProductCard/ProductCard'
import Table from 'src/components/Table/Table'
import { AppUrls } from 'src/config/config'
import { productMockData } from 'src/config/mockData'
import { Product } from 'src/types/product.type'
import Slider from 'react-slick'
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs'

type Props = {}

const ProductDetail = (props: Props) => {
  const [product, setProduct] = useState<Product>(productMockData)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(Array(10).fill(productMockData))

  const [showProviderDetail, setShowProviderDetail] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ type: 'mainImg' | 'otherImg'; id: any }>({
    type: 'mainImg',
    id: 0
  })

  const navigate = useNavigate()

  const settings = {
    autoplay: true,
    arrows: true,
    dots: true,
    speed: 500,
    // centerMode: true,
    slidesToShow: 5,
    // window.innerWidth <= parseInt(variables.mobileWidth.replace("px", ""))
    //   ? 1
    //   : window.innerWidth <=
    //     parseInt(variables.desktopWidth.replace("px", ""))
    //   ? 2
    //   : 3,
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

  return (
    <div className='container grid grid-cols-6 gap-6 overflow-scroll py-4 md:py-6 xl:gap-7'>
      <div className='col-span-6 h-fit'>
        <InputSearch />
      </div>
      <div className='col-span-6'>
        <BreadCrumbs />
      </div>
      {product && (
        <>
          {/* Images */}
          <div className='col-span-6 grid lg:col-span-3 lg:grid-cols-12 lg:gap-2'>
            <div className='col-span-1 flex gap-4 overflow-scroll lg:col-span-2 lg:flex-col lg:gap-2'>
              {images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={image}
                  className={
                    index === selectedImage.id
                      ? 'rounded-sm lg:border lg:border-x-[1px] lg:border-y-[1px] lg:border-primary'
                      : ''
                  }
                  onClick={() => setSelectedImage({ type: 'otherImg', id: index })}
                />
              ))}
            </div>
            <div className='hidden lg:col-span-10 lg:block'>
              <img src={selectedImage.type !== 'mainImg' ? images[selectedImage.id] : images[0]} alt='mainImg' />
            </div>
          </div>

          {/* Details */}
          <div className='col-span-6 flex flex-col justify-center gap-6 lg:col-span-3'>
            <div className=''>
              <span className='block text-base text-gray-400'>
                {/* {product?.type} */}
                T-shirt
              </span>
              <h2 className='mt-2 text-3xl font-semibold text-gray-900'>
                {/* {product?.name} */}
                Men's sport tee
              </h2>
            </div>
            <h3 className='text-2xl text-primary'>$ {product.price}+</h3>
            <ul className='list-disc pl-6 text-base text-gray-900'>
              <li>Medium fabric (5.3 oz/yd² (180 g/m²))</li>
              <li>Classic fit</li>
              <li>Runs true to size</li>
              <li>100% cotton (fiber content may vary for different colors)</li>
              <li>Tear-away label</li>
            </ul>
            <div className='flex items-center gap-6'>
              <span className='text-md cursor-pointer font-medium text-primary hover:text-purple-300'>
                More details
              </span>
              <CustomButton
                title='Custom now'
                type='filled'
                handleClick={() => navigate(AppUrls.editProduct(product?._id))}
              />
            </div>
          </div>

          {/* Providers */}
          {/* <h2 className='text-2xl font-semibold text-gray-900'>Print providers</h2> */}
          <div className='col-span-6 flex flex-col rounded-lg border border-gray-200 bg-[#f8f8f8]'>
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
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
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
          </div>

          <div className='col-span-6'>
            {/* About */}
            <div className='col-span-6 grid grid-cols-6 border-b py-8 text-gray-900'>
              <h2 className='text-2xl font-semibold lg:col-span-2'>About</h2>
              <p className='col-span-6 text-justify text-base lg:col-span-4'>{product.description}</p>
            </div>

            {/* Size guide */}
            <div className='col-span-6 grid grid-cols-6 border-b py-8 text-gray-900'>
              <h2 className='text-2xl font-semibold lg:col-span-2'>Size guide</h2>
              <div className='col-span-6 lg:col-span-4'>
                {/* Table */}
                <Table />
              </div>
            </div>
          </div>

          {/* Related products */}

          <h2 className='col-span-6 mt-4 text-2xl font-semibold'>You may like</h2>
          <div
            // className={`col-span-6 mt-4 grid grid-cols-2 gap-3 overflow-scroll md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
            // className={`col-span-6 grid auto-cols-[calc(20%)] grid-flow-col gap-3 overflow-x-scroll`}
            className={`col-span-6 pb-6`}
          >
            <Slider {...settings}>
              {relatedProducts?.map((item: Product, idx: number) => (
                <div className='' key={item._id}>
                  <ProductCard productData={item} />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductDetail

const images = [
  'https://images.printify.com/api/catalog/643cfea7d1be3ef343016b73.jpg?s=432',
  'https://images.printify.com/api/catalog/643cfeabe95f9578ab0f3f53.jpg?s=432',
  'https://images.printify.com/api/catalog/643cfeaec77fc5bffd0a8857.jpg?s=432'
]

// const dummyData = {
//   blueprintId: 6,
//   brandName: 'Gildan',
//   careSets: [
//     {
//       set: 'Washing',
//       icon: '59e737edb8e7e349924a4503',
//       option: 'Machine wash: warm (max 40C or 105F)'
//     },
//     {
//       set: 'Bleaching',
//       icon: '59e0f7bdb8e7e31747148874',
//       option: 'Non-chlorine: bleach as needed'
//     },
//     {
//       set: 'Drying',
//       icon: '59e0f9a5b8e7e30a60795f96',
//       option: 'Tumble dry: medium'
//     },
//     {
//       set: 'Ironing',
//       icon: '59e0f841b8e7e30a5b0a55ba',
//       option: 'Do not iron\r\n'
//     },
//     {
//       set: 'Drycleaning ',
//       icon: '5f7f1ca9104c523b41518e2e',
//       option: 'Do not dryclean\r\n'
//     }
//   ],
//   printProviders: [
//     {
//       id: 50,
//       minPrice: 961,
//       minPriceSubscription: 768,
//       name: 'Underground Threads',
//       twoDaysDeliveryEnabled: false,
//       details: {
//         technology:
//           'Aeoon KYO and Kornit Storm Hexa are state-of-the-art digital presses, which provide the highest quality output. \n\nInks: Kyo utilizes Dupont inks that are environmentally friendly and are Oeko-Tex and GOTS certified. The vibrant colors provide astonishing results on black, white, and various color textiles. Storm Hexa - Neo Pigment Inks are non-hazardous, non-toxic, and biodegradable. ',
//         qualityControl:
//           'Garments are individually inspected during each phase of the process, to ensure the correct size, image and highest quality print are received.',
//         packaging: {
//           content: 'The products are shipped in self-sealing poly bags.',
//           files: ['60dd7575beec3e15c24a851f']
//         }
//       },
//       bulkDiscountEnabled: false,
//       averageBusinessDaysInProduction: 2.9,
//       location: {
//         country: 'United States',
//         countryCode: 'US',
//         isInternational: false
//       },
//       rankingScore: 99,
//       printPosition: [
//         {
//           label: 'Back side',
//           position: 'back'
//         },
//         {
//           label: 'Front side',
//           position: 'front'
//         }
//       ],
//       scoring: {
//         generic_score: 9.326,
//         quality: 9.757,
//         production_speed: 9.153,
//         stock_reliability: 9.992,
//         courtesy: 9.992
//       },
//       shipping: [
//         {
//           country: 'United States',
//           additional: 219,
//           first: 519,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 172,
//           destinationGroupLabel: 'United States'
//         },
//         {
//           country: 'United States',
//           additional: 219,
//           first: 519,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 172,
//           destinationGroupLabel: 'United States'
//         },
//         {
//           country: 'Canada',
//           additional: 439,
//           first: 939,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 173,
//           destinationGroupLabel: 'Canada'
//         },
//         {
//           country: 'Canada',
//           additional: 439,
//           first: 939,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 173,
//           destinationGroupLabel: 'Canada'
//         },
//         {
//           country: 'Rest of World',
//           additional: 400,
//           first: 1000,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 0,
//           destinationGroupLabel: 'Rest of World'
//         },
//         {
//           country: 'Rest of World',
//           additional: 400,
//           first: 1000,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 0,
//           destinationGroupLabel: 'Rest of World'
//         },
//         {
//           country: 'Australia',
//           additional: 499,
//           first: 1249,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 0,
//           destinationGroupLabel: 'Australia'
//         },
//         {
//           country: 'Australia',
//           additional: 499,
//           first: 1249,
//           type: 'All',
//           method: 'standard',
//           destinationGroupId: 0,
//           destinationGroupLabel: 'Australia'
//         }
//       ],
//       minShipping: 519,
//       brandingFeatures: [],
//       facilities: [
//         {
//           id: 146,
//           country_label: 'United States',
//           country_code: 'US',
//           region_label: 'USA',
//           region_code: 'usa'
//         },
//         {
//           id: 50,
//           country_label: 'United States',
//           country_code: 'US',
//           region_label: 'USA',
//           region_code: 'usa'
//         }
//       ],
//       tags: [],
//       variants: [
//         {
//           id: 12030,
//           options: [425, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12122,
//           options: [513, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11903,
//           options: [367, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Print Geek',
//             'Drive Fulfillment',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11877,
//           options: [424, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Print Clever',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11897,
//           options: [362, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12076,
//           options: [554, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11985,
//           options: [552, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'SwiftPOD', 'FYBY'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 487,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1481,
//               resultSubscription: 1184
//             }
//           ]
//         },
//         {
//           id: 12150,
//           options: [438, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12024,
//           options: [423, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12059,
//           options: [436, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11853,
//           options: [366, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Duplium', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12054,
//           options: [421, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Stacked Commerce',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12148,
//           options: [438, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12151,
//           options: [438, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12152,
//           options: [438, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12028,
//           options: [425, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12005,
//           options: [535, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 24088,
//           options: [424, 21],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11888,
//           options: [386, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11902,
//           options: [367, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Print Geek',
//             'Drive Fulfillment',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12025,
//           options: [423, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12029,
//           options: [425, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12165,
//           options: [437, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Monster Digital', 'Fulfill Engine', 'SwiftPOD', 'FYBY'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11962,
//           options: [433, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Logistic',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12209,
//           options: [372, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11983,
//           options: [552, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Duplium',
//             'T Shirt and Sons',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11988,
//           options: [511, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11987,
//           options: [511, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11907,
//           options: [367, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Print Geek',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12193,
//           options: [364, 17],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12194,
//           options: [364, 18],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12123,
//           options: [513, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12124,
//           options: [418, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 24099,
//           options: [367, 21],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Dimona Tee', 'SwiftPOD', 'Marco Fine Arts'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12031,
//           options: [425, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11896,
//           options: [362, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12032,
//           options: [425, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12104,
//           options: [521, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 409,
//               fee: 0,
//               margin: 33,
//               printing: 405,
//               placeholders: ['front'],
//               result: 1215,
//               resultSubscription: 971
//             }
//           ]
//         },
//         {
//           id: 12063,
//           options: [436, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12081,
//           options: [554, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11966,
//           options: [433, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Logistic',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12100,
//           options: [521, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 239,
//               fee: 0,
//               margin: 33,
//               printing: 405,
//               placeholders: ['front'],
//               result: 961,
//               resultSubscription: 768
//             }
//           ]
//         },
//         {
//           id: 12118,
//           options: [513, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12007,
//           options: [535, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11924,
//           options: [412, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11984,
//           options: [552, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 411,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1367,
//               resultSubscription: 1093
//             }
//           ]
//         },
//         {
//           id: 12062,
//           options: [436, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12022,
//           options: [423, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11980,
//           options: [552, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Duplium',
//             'T Shirt and Sons',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12208,
//           options: [372, 16],
//           available: false,
//           availablePrintProviders: ['Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11899,
//           options: [362, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12213,
//           options: [372, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12017,
//           options: [398, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12127,
//           options: [418, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12128,
//           options: [418, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12129,
//           options: [418, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12159,
//           options: [407, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11886,
//           options: [386, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11885,
//           options: [386, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11921,
//           options: [412, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12103,
//           options: [521, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 239,
//               fee: 0,
//               margin: 33,
//               printing: 405,
//               placeholders: ['front'],
//               result: 961,
//               resultSubscription: 768
//             }
//           ]
//         },
//         {
//           id: 12121,
//           options: [513, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11827,
//           options: [537, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12119,
//           options: [513, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'T Shirt and Sons',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11863,
//           options: [403, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12125,
//           options: [418, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11898,
//           options: [362, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12080,
//           options: [554, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12006,
//           options: [535, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12155,
//           options: [407, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12191,
//           options: [364, 15],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12016,
//           options: [398, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12180,
//           options: [434, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 23963,
//           options: [362, 20],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Monster Digital', 'Fulfill Engine', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11982,
//           options: [552, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12182,
//           options: [434, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12061,
//           options: [436, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12101,
//           options: [521, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 239,
//               fee: 0,
//               margin: 33,
//               printing: 405,
//               placeholders: ['front'],
//               result: 961,
//               resultSubscription: 768
//             }
//           ]
//         },
//         {
//           id: 12158,
//           options: [407, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12211,
//           options: [372, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12212,
//           options: [372, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11851,
//           options: [366, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12064,
//           options: [551, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12067,
//           options: [551, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12068,
//           options: [551, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 24153,
//           options: [358, 21],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Print Logistic',
//             'Print Clever',
//             'SwiftPOD',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12077,
//           options: [554, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12079,
//           options: [554, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 23965,
//           options: [367, 20],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11925,
//           options: [412, 19],
//           available: false,
//           availablePrintProviders: [],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12021,
//           options: [398, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12070,
//           options: [358, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12074,
//           options: [358, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12183,
//           options: [434, 19],
//           available: false,
//           availablePrintProviders: ['The Print Bar', 'Fulfill Engine', 'Duplium', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12190,
//           options: [364, 16],
//           available: false,
//           availablePrintProviders: [
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12026,
//           options: [423, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11904,
//           options: [367, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Print Geek',
//             'Drive Fulfillment',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11952,
//           options: [369, 14],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11824,
//           options: [537, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 24048,
//           options: [407, 20],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 24182,
//           options: [407, 21],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12057,
//           options: [421, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'Drive Fulfillment',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Stacked Commerce',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12195,
//           options: [364, 19],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12149,
//           options: [438, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12164,
//           options: [437, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Monster Digital',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11849,
//           options: [366, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11957,
//           options: [392, 15],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12153,
//           options: [438, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11865,
//           options: [403, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11872,
//           options: [424, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Print Clever',
//             'T Shirt and Sons',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11889,
//           options: [386, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12163,
//           options: [437, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Monster Digital',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12181,
//           options: [434, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11850,
//           options: [366, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11875,
//           options: [424, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Print Clever',
//             'T Shirt and Sons',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11876,
//           options: [424, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Print Clever',
//             'T Shirt and Sons',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12060,
//           options: [436, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12120,
//           options: [513, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 23955,
//           options: [424, 20],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Monster Digital',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12102,
//           options: [521, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 239,
//               fee: 0,
//               margin: 33,
//               printing: 405,
//               placeholders: ['front'],
//               result: 961,
//               resultSubscription: 768
//             }
//           ]
//         },
//         {
//           id: 12192,
//           options: [364, 14],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12052,
//           options: [421, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Stacked Commerce',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12126,
//           options: [418, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'X-Print',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12162,
//           options: [437, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Monster Digital',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12179,
//           options: [434, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12178,
//           options: [434, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 24060,
//           options: [364, 20],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Monster Digital', 'Dimona Tee'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 24194,
//           options: [364, 21],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Monster Digital', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11829,
//           options: [537, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12027,
//           options: [423, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11950,
//           options: [369, 16],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11955,
//           options: [369, 19],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11860,
//           options: [403, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11990,
//           options: [511, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12055,
//           options: [421, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Stacked Commerce',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 24021,
//           options: [358, 20],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11864,
//           options: [403, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12210,
//           options: [372, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11981,
//           options: [552, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12008,
//           options: [535, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11861,
//           options: [403, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11873,
//           options: [424, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Print Clever',
//             'T Shirt and Sons',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11874,
//           options: [424, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Print Clever',
//             'T Shirt and Sons',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11905,
//           options: [367, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Print Geek',
//             'Drive Fulfillment',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11825,
//           options: [537, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11826,
//           options: [537, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11852,
//           options: [366, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11900,
//           options: [362, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11901,
//           options: [362, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Monster Digital',
//             'Print Geek',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11922,
//           options: [412, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11828,
//           options: [537, 18],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11964,
//           options: [433, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Logistic',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11960,
//           options: [392, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11961,
//           options: [392, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11848,
//           options: [366, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11862,
//           options: [403, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11967,
//           options: [433, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11884,
//           options: [386, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11986,
//           options: [511, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11887,
//           options: [386, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11991,
//           options: [511, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11920,
//           options: [412, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12018,
//           options: [398, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12019,
//           options: [398, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11963,
//           options: [433, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Logistic',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11923,
//           options: [412, 17],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12056,
//           options: [421, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Stacked Commerce',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 11951,
//           options: [369, 15],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11989,
//           options: [511, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11953,
//           options: [369, 17],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11958,
//           options: [392, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12069,
//           options: [551, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12065,
//           options: [551, 15],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12020,
//           options: [398, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12004,
//           options: [535, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11956,
//           options: [392, 16],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12066,
//           options: [551, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11906,
//           options: [367, 18],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Print Geek',
//             'Drive Fulfillment',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12078,
//           options: [554, 14],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12071,
//           options: [358, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12009,
//           options: [535, 19],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 11954,
//           options: [369, 18],
//           available: false,
//           availablePrintProviders: [
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 421,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1382,
//               resultSubscription: 1105
//             }
//           ]
//         },
//         {
//           id: 12023,
//           options: [423, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11959,
//           options: [392, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12156,
//           options: [407, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 11965,
//           options: [433, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Logistic',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12053,
//           options: [421, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Stacked Commerce',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12161,
//           options: [437, 15],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Monster Digital',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12105,
//           options: [521, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 487,
//               fee: 0,
//               margin: 33,
//               printing: 405,
//               placeholders: ['front'],
//               result: 1331,
//               resultSubscription: 1064
//             }
//           ]
//         },
//         {
//           id: 12033,
//           options: [425, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12075,
//           options: [358, 19],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         },
//         {
//           id: 12072,
//           options: [358, 14],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Logistic',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12073,
//           options: [358, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Textildruck Europa',
//             'Stoked On Printing',
//             'Monster Digital',
//             'Print Geek',
//             'The Print Bar',
//             'Drive Fulfillment',
//             'Awkward Styles',
//             'OPT OnDemand',
//             'Dimona Tee',
//             'Fulfill Engine',
//             'Duplium',
//             'Stacked Commerce',
//             'Print Clever',
//             'T Shirt and Sons',
//             'SwiftPOD',
//             'FYBY',
//             'Marco Fine Arts',
//             'PH Print Norden',
//             'Prima Printing'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12154,
//           options: [407, 16],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'Print Clever', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12157,
//           options: [407, 17],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'The Print Bar',
//             'Fulfill Engine',
//             'Duplium',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12058,
//           options: [436, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'Print Clever',
//             'SwiftPOD'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 12160,
//           options: [437, 16],
//           available: true,
//           availablePrintProviders: [
//             'Underground Threads',
//             'Monster Digital',
//             'Awkward Styles',
//             'Fulfill Engine',
//             'SwiftPOD',
//             'FYBY'
//           ],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 247,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1122,
//               resultSubscription: 897
//             }
//           ]
//         },
//         {
//           id: 24097,
//           options: [362, 21],
//           available: true,
//           availablePrintProviders: ['Underground Threads', 'Monster Digital', 'SwiftPOD'],
//           status: 'in-stock',
//           costs: [
//             {
//               blank: 545,
//               fee: 0,
//               margin: 33,
//               printing: 505,
//               placeholders: ['front'],
//               result: 1567,
//               resultSubscription: 1253
//             }
//           ]
//         }
//       ],
//       options: [
//         {
//           type: 'size',
//           items: [
//             {
//               id: 14,
//               label: 'S'
//             },
//             {
//               id: 15,
//               label: 'M'
//             },
//             {
//               id: 16,
//               label: 'L'
//             },
//             {
//               id: 17,
//               label: 'XL'
//             },
//             {
//               id: 18,
//               label: '2XL'
//             },
//             {
//               id: 19,
//               label: '3XL'
//             },
//             {
//               id: 20,
//               label: '4XL'
//             },
//             {
//               id: 21,
//               label: '5XL'
//             }
//           ]
//         },
//         {
//           type: 'color',
//           items: [
//             {
//               id: 358,
//               label: 'Sport Grey',
//               colorGroup: {
//                 id: 10
//               },
//               colors: [
//                 {
//                   hex: '#CACACA',
//                   pattern: '5853fecfce46f30f832820b5',
//                   rgb: '180,179,178'
//                 }
//               ]
//             },
//             {
//               id: 362,
//               label: 'Dark Chocolate',
//               colorGroup: {
//                 id: 18
//               },
//               colors: [
//                 {
//                   hex: '#31221D',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '61, 44, 38'
//                 }
//               ]
//             },
//             {
//               id: 364,
//               label: 'Military Green',
//               colorGroup: {
//                 id: 36
//               },
//               colors: [
//                 {
//                   hex: '#585c3b',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '88, 92, 59'
//                 }
//               ]
//             },
//             {
//               id: 366,
//               label: 'Ash',
//               colorGroup: {
//                 id: 10
//               },
//               colors: [
//                 {
//                   hex: '#F6F6F6',
//                   pattern: '5853fecfce46f30f832820b2',
//                   rgb: '246,246,246'
//                 }
//               ]
//             },
//             {
//               id: 367,
//               label: 'Dark Heather',
//               colorGroup: {
//                 id: 43
//               },
//               colors: [
//                 {
//                   hex: '#454545',
//                   pattern: '5853fed0ce46f30f8328211b',
//                   rgb: '85,106,111'
//                 }
//               ]
//             },
//             {
//               id: 369,
//               label: 'Irish Green',
//               colorGroup: {
//                 id: 35
//               },
//               colors: [
//                 {
//                   hex: '#129447',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '0,174,64'
//                 }
//               ]
//             },
//             {
//               id: 372,
//               label: 'Sunset',
//               colorGroup: {
//                 id: 30
//               },
//               colors: [
//                 {
//                   hex: '#ed8957',
//                   pattern: '5853fecfce46f30f832820bb',
//                   rgb: '220,107,47'
//                 }
//               ]
//             },
//             {
//               id: 386,
//               label: 'Cornsilk',
//               colorGroup: {
//                 id: 31
//               },
//               colors: [
//                 {
//                   hex: '#F7EF8F',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '250, 247, 172'
//                 }
//               ]
//             },
//             {
//               id: 392,
//               label: 'Light Blue',
//               colorGroup: {
//                 id: 39
//               },
//               colors: [
//                 {
//                   hex: '#d6e6f7',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '164,200,225'
//                 }
//               ]
//             },
//             {
//               id: 398,
//               label: 'Purple',
//               colorGroup: {
//                 id: 25
//               },
//               colors: [
//                 {
//                   hex: '#3C214E',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '75,42,97'
//                 }
//               ]
//             },
//             {
//               id: 403,
//               label: 'Brown Savana',
//               colorGroup: {
//                 id: 17
//               },
//               colors: [
//                 {
//                   hex: '#948272',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '148, 130, 120'
//                 }
//               ]
//             },
//             {
//               id: 407,
//               label: 'Graphite Heather',
//               colorGroup: {
//                 id: 7
//               },
//               colors: [
//                 {
//                   hex: '#707372',
//                   pattern: null,
//                   rgb: '112,115,114'
//                 }
//               ]
//             },
//             {
//               id: 412,
//               label: 'Gravel',
//               colorGroup: {
//                 id: 7
//               },
//               colors: [
//                 {
//                   hex: '#9CA1A3',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '176, 181, 178'
//                 }
//               ]
//             },
//             {
//               id: 418,
//               label: 'Black',
//               colorGroup: {
//                 id: 2
//               },
//               colors: [
//                 {
//                   hex: '#000000',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '5,5,5'
//                 }
//               ]
//             },
//             {
//               id: 421,
//               label: 'Sand',
//               colorGroup: {
//                 id: 17
//               },
//               colors: [
//                 {
//                   hex: '#DCD2BE',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '224, 214, 197'
//                 }
//               ]
//             },
//             {
//               id: 423,
//               label: 'Red',
//               colorGroup: {
//                 id: 28
//               },
//               colors: [
//                 {
//                   hex: '#C62A32',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '210,21,31'
//                 }
//               ]
//             },
//             {
//               id: 424,
//               label: 'Charcoal',
//               colorGroup: {
//                 id: 43
//               },
//               colors: [
//                 {
//                   hex: '#585559',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '74, 79, 82'
//                 }
//               ]
//             },
//             {
//               id: 425,
//               label: 'Royal',
//               colorGroup: {
//                 id: 41
//               },
//               colors: [
//                 {
//                   hex: '#084f97',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '8,79,151'
//                 }
//               ]
//             },
//             {
//               id: 433,
//               label: 'Light Pink',
//               colorGroup: {
//                 id: 22
//               },
//               colors: [
//                 {
//                   hex: '#FEE0EB',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '255, 212, 231'
//                 }
//               ]
//             },
//             {
//               id: 434,
//               label: 'Lime',
//               colorGroup: {
//                 id: 34
//               },
//               colors: [
//                 {
//                   hex: '#9EC46C',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '146,191,85'
//                 }
//               ]
//             },
//             {
//               id: 436,
//               label: 'Sapphire',
//               colorGroup: {
//                 id: 38
//               },
//               colors: [
//                 {
//                   hex: '#0080b5',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '0, 119, 181'
//                 }
//               ]
//             },
//             {
//               id: 437,
//               label: 'Ice Grey',
//               colorGroup: {
//                 id: 10
//               },
//               colors: [
//                 {
//                   hex: '#D7D6D3',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '215,210,203'
//                 }
//               ]
//             },
//             {
//               id: 438,
//               label: 'Gold',
//               colorGroup: {
//                 id: 31
//               },
//               colors: [
//                 {
//                   hex: '#ffb81c',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '255,184,28'
//                 }
//               ]
//             },
//             {
//               id: 511,
//               label: 'Navy',
//               colorGroup: {
//                 id: 41
//               },
//               colors: [
//                 {
//                   hex: '#1a2237',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '31,42,68'
//                 }
//               ]
//             },
//             {
//               id: 513,
//               label: 'Azalea',
//               colorGroup: {
//                 id: 21
//               },
//               colors: [
//                 {
//                   hex: '#EF8FBC',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '239,104,168'
//                 }
//               ]
//             },
//             {
//               id: 521,
//               label: 'White',
//               colorGroup: {
//                 id: 3
//               },
//               colors: [
//                 {
//                   hex: '#ffffff',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '249,249,249'
//                 }
//               ]
//             },
//             {
//               id: 535,
//               label: 'Old Gold',
//               colorGroup: {
//                 id: 17
//               },
//               colors: [
//                 {
//                   hex: '#C99B5C',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '189,147,87'
//                 }
//               ]
//             },
//             {
//               id: 537,
//               label: 'Tennessee Orange',
//               colorGroup: {
//                 id: 30
//               },
//               colors: [
//                 {
//                   hex: '#F79B2E',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '255,137,64'
//                 }
//               ]
//             },
//             {
//               id: 551,
//               label: 'Sky',
//               colorGroup: {
//                 id: 39
//               },
//               colors: [
//                 {
//                   hex: '#8BCDEA',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '150, 227, 255'
//                 }
//               ]
//             },
//             {
//               id: 552,
//               label: 'Natural',
//               colorGroup: {
//                 id: 16
//               },
//               colors: [
//                 {
//                   hex: '#F6F0E1',
//                   pattern: '5853fec7ce46f30f8328200a',
//                   rgb: '247, 244, 225'
//                 }
//               ]
//             },
//             {
//               id: 554,
//               label: 'Texas Orange',
//               colorGroup: {
//                 id: 30
//               },
//               colors: [
//                 {
//                   hex: '#c26928',
//                   pattern: '5853fecdce46f30f832820ac',
//                   rgb: '182,90,48'
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ],
//   description:
//     'The unisex heavy cotton tee is the basic staple of any wardrobe. It is the foundation upon which casual fashion grows. All it needs is a personalized design to elevate things to profitability. The specially spun fibers provide a smooth surface for premium printing vividity and sharpness. No side seams mean there are no itchy interruptions under the arms. The shoulders have tape for improved durability.',
//   details: [
//     'Medium fabric (5.3 oz/yd² (180 g/m²))',
//     'Classic fit',
//     'Runs true to size',
//     '100% cotton (fiber content may vary for different colors)',
//     'Tear-away label'
//   ],
//   features: [
//     {
//       name: 'Shoulder tape',
//       description: 'Twill tape covers the shoulder seams to stabilize the back of the garment and prevent stretching',
//       image: '59e0ea55b8e7e34c675732f9/icons_v4_outlined_37_shoulder_tape.svg'
//     },
//     {
//       name: 'Fiber composition',
//       description:
//         'Solid colors are 100% cotton;\nHeather colors are 50% cotton, 50% polyester (Sport Grey and Antique colors are 90% cotton, 10% polyester. Ash is 99% cotton, 1% polyester)',
//       image: '59e0e608b8e7e33b2f5b1e90/icons_v4_outlined_1_cotton.svg'
//     },
//     {
//       name: 'Without side seams',
//       description:
//         'Knitted in one piece using tubular knit, it reduces fabric waste and makes the garment more attractive',
//       image: '59e0e9ebb8e7e30aa54c3178/icons_v4_outlined_34_without_side_seams.svg'
//     },
//     {
//       name: 'Ribbed knit collar without seam',
//       description: 'Ribbed knit makes the collar highly elastic and helps retain its shape',
//       image: '59e0ef39b8e7e36e403b5906/icons_v4_outlined_39_collar_seam.svg'
//     },
//     {
//       name: 'Fabric',
//       description:
//         'Made from specially spun fibers that make a very strong and smooth fabric that is perfect for printing. The "Natural" color is made with unprocessed cotton, which results in small black flecks throughout the fabric',
//       image: '59e0e88bb8e7e3174714886e/icons_v4_outlined_21_cover.svg'
//     }
//   ],
//   hiddenTags: ['Bestsellers', 'positioner update', 'Printify Express', 'MOP'],
//   media: [
//     {
//       src: '6437eef54e3cf4dd08026347',
//       catalogPreview: ["Women's Clothing"]
//     },
//     {
//       src: '64394d8c2a4d01d9960aa971',
//       catalogPreview: ["Women's Clothing", 'Hover Feature']
//     },
//     {
//       src: '6283a8e2515ac64e9e044594',
//       catalogPreview: []
//     },
//     {
//       src: '6437f070c6bb23f9e309d093',
//       catalogPreview: ["Men's Clothing"]
//     },
//     {
//       src: '64394d93fe5f3d8d500785e1',
//       catalogPreview: ["Men's Clothing", 'Hover Feature']
//     },
//     {
//       src: '643968472686b61fe80abf2a',
//       catalogPreview: []
//     },
//     {
//       src: '6283a8de515ac64e9e04458e',
//       catalogPreview: []
//     },
//     {
//       src: '643967bb09be95024805f8ca',
//       catalogPreview: []
//     },
//     {
//       src: '643966f109be95024805f8c3',
//       catalogPreview: []
//     },
//     {
//       src: '620b8374072629065746566b',
//       catalogPreview: []
//     },
//     {
//       src: '620b8375072629065746566e',
//       catalogPreview: []
//     },
//     {
//       src: '620b8375180ecf5ad95535fa',
//       catalogPreview: []
//     },
//     {
//       video:
//         '<iframe width="560" height="415" src="https://www.youtube.com/embed/n9nZs1oOuSs?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
//     }
//   ],
//   type: 't-shirt',
//   model: '5000',
//   name: 'Unisex Heavy Cotton Tee',
//   pricingPrintArea: 'front',
//   seo: {
//     title: 'Gildan 5000 | Unisex Heavy Cotton™ T-Shirt',
//     description:
//       "The Gildan 5000 heavy cotton adult t-shirt is a number one best seller. It's made from preshrunk cotton and comes in a variety of colors.",
//     socialImage: ''
//   },
//   sizeGuide: {
//     sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
//     types: [
//       {
//         name: 'Width',
//         units: 'length',
//         ranges: [
//           {
//             from: '457',
//             to: ''
//           },
//           {
//             from: '508',
//             to: ''
//           },
//           {
//             from: '558',
//             to: ''
//           },
//           {
//             from: '609',
//             to: ''
//           },
//           {
//             from: '660',
//             to: ''
//           },
//           {
//             from: '711',
//             to: ''
//           },
//           {
//             from: '763',
//             to: ''
//           },
//           {
//             from: '812',
//             to: ''
//           }
//         ]
//       },
//       {
//         name: 'Length',
//         units: 'length',
//         ranges: [
//           {
//             from: '711.2',
//             to: ''
//           },
//           {
//             from: '736.6',
//             to: ''
//           },
//           {
//             from: '762',
//             to: ''
//           },
//           {
//             from: '787.4',
//             to: ''
//           },
//           {
//             from: '812.8',
//             to: ''
//           },
//           {
//             from: '838.2',
//             to: ''
//           },
//           {
//             from: '863.6',
//             to: ''
//           },
//           {
//             from: '889',
//             to: ''
//           }
//         ]
//       },
//       {
//         name: 'Sleeve length',
//         units: 'length',
//         ranges: [
//           {
//             from: '184',
//             to: ''
//           },
//           {
//             from: '197',
//             to: ''
//           },
//           {
//             from: '209',
//             to: ''
//           },
//           {
//             from: '222',
//             to: ''
//           },
//           {
//             from: '235',
//             to: ''
//           },
//           {
//             from: '248',
//             to: ''
//           },
//           {
//             from: '260',
//             to: ''
//           },
//           {
//             from: '273',
//             to: ''
//           }
//         ]
//       }
//     ]
//   },
//   tags: ["Men's Clothing", 'T-shirts', "Women's Clothing", 'DTG', 'Regular fit', 'Unisex', 'Crew neck', 'Neck Labels'],
//   managed_tags: [
//     {
//       id: 456,
//       label: 'Neck Labels',
//       visible: true,
//       promotional: false,
//       rank: 10,
//       icon: null
//     },
//     {
//       id: 6,
//       label: 'Crew neck',
//       visible: true,
//       promotional: false,
//       rank: 10,
//       icon: null
//     },
//     {
//       id: 7,
//       label: 'Cotton',
//       visible: true,
//       promotional: false,
//       rank: 10,
//       icon: null
//     },
//     {
//       id: 5,
//       label: 'Regular fit',
//       visible: true,
//       promotional: false,
//       rank: 10,
//       icon: null
//     },
//     {
//       id: 4,
//       label: 'DTG',
//       visible: true,
//       promotional: false,
//       rank: 10,
//       icon: null
//     },
//     {
//       id: 3,
//       label: "Kids' Clothing",
//       visible: true,
//       promotional: false,
//       rank: 10,
//       icon: null
//     },
//     {
//       id: 2,
//       label: 'T-shirts',
//       visible: true,
//       promotional: false,
//       rank: 10,
//       icon: null
//     },
//     {
//       id: 1,
//       label: 'positioner update',
//       visible: false,
//       promotional: false,
//       rank: 10,
//       icon: null
//     }
//   ]
// }
