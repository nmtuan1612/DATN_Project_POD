import { useMutation, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import Loading from 'src/components/Loading/Loading'
import { Product, SampleProductDetail } from 'src/types/product.type'
import { getIdFromNameId } from 'src/utils/utils'
import { CustomButton } from '../../components'
import { SampleLogos } from '../../config/constants'
import { fadeAnimation, slideAnimation } from '../../config/motion'
import state from '../../store'
import './EditorPage.style.scss'
import CustomProductForm from './components/CustomForm/CustomProductForm'
import CanvasModel from './components/canvas'

type Props = {}

const EditorPage = (props: Props) => {
  const navigate = useNavigate()
  const { state: routeState } = useLocation()
  const { productId } = useParams()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['product', getIdFromNameId(productId as string)],
    queryFn: () =>
      routeState && routeState.productType === 'storeProduct'
        ? productApi.getStoreProductWithId(productId as string)
        : productApi.getSampleProductWithId(getIdFromNameId(productId as string)),
    staleTime: 2 * (60 * 1000)
  })
  const product: SampleProductDetail | Product = data?.data?.data

  useEffect(() => {
    if (product) {
      state.modelUrl = product?.modelMetaData?.modelUrl as string
      if (routeState && routeState.productType === 'storeProduct') {
        const { customMetadata, modelMetaData } = product as Product

        if (customMetadata?.color) {
          state.color = customMetadata?.color
        }

        if (customMetadata?.rotation?.length) {
          state.rotate = customMetadata?.rotation
        }

        if (customMetadata?.logo) {
          state.isLogoTexture = true
          state.logoDecal = customMetadata.logo
          state.logoPrintOptions = customMetadata.logoPrintOptions || { scale: modelMetaData.logoScale }
        }

        if (customMetadata?.fullTexture) {
          state.isFullTexture = true
          state.fullDecal = customMetadata.fullTexture
          state.fullTexturePrintOptions = customMetadata.fullTexturePrintOptions || {
            scale: modelMetaData.textureScale
          }
        }
      } else {
        const { modelMetaData } = product as SampleProductDetail

        if (modelMetaData.rotation?.length) {
          state.rotate = modelMetaData.rotation
        }
        state.logoPrintOptions.scale = modelMetaData.logoScale
        state.fullTexturePrintOptions.scale = modelMetaData.textureScale
      }
    }
  }, [product])

  const productMutation = useMutation({ mutationFn: productApi.addStoreProduct })
  const storeProductMutation = useMutation({
    mutationFn: (body: any) => productApi.updateStoreProduct(productId as string, body)
  })

  const handleExportImage = () => {
    const link = document.createElement('a')
    link.setAttribute('download', 'canvas.png')
    link.setAttribute(
      'href',
      document.querySelector('canvas')?.toDataURL('image/png')?.replace('image/png', 'image/octet-stream') as string
    )
    link.click()
  }

  return isLoading || productMutation?.isLoading || storeProductMutation?.isLoading ? (
    <Loading />
  ) : (
    <AnimatePresence>
      <div className='app flex h-screen w-screen flex-col overflow-hidden transition-all ease-in'>
        {/* Header */}
        <div className='z-20 flex items-center justify-between gap-2 bg-white px-4 py-2 shadow-sm'>
          <Link to='/' className='logo' style={{ fontSize: 28 }}>
            <span className='text-primary'>Creo</span>
            <span className='text-gray-400'>Print</span>
          </Link>

          <motion.div className='right-5 top-5 z-10' {...fadeAnimation}>
            <h3 className='text-xl font-semibold text-gray-900'>{product.name}</h3>
          </motion.div>
          <div></div>
        </div>
        {/* Content */}
        <div className='relative h-full w-full bg-blue-50'>
          <motion.div className='absolute right-5 top-5 z-20' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => {
                navigate(-1)
              }}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              disabled={productMutation.isLoading || storeProductMutation.isLoading}
            />
          </motion.div>
          <CustomProductForm
            refetch={refetch}
            product={product}
            productMutation={productMutation}
            storeProductMutation={storeProductMutation}
          />

          {product && (
            <motion.div className='relative h-full w-full md:pl-[200px]' {...fadeAnimation}>
              <CanvasModel product={product} />

              <div className='decals-container md:pl-[200px]'>
                <h3 className='font-semibold text-primary'>Sample Logo</h3>
                {SampleLogos.map((logo) => (
                  <div key={logo} className={`decal`} onClick={() => (state.logoDecal = logo)}>
                    <img src={logo} alt='brand' />
                  </div>
                ))}
                <CustomButton
                  customStyles='md:ml-10'
                  title={
                    <>
                      Download
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='ml-[6px] h-4 w-4'
                      >
                        <path
                          fillRule='evenodd'
                          d='M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </>
                  }
                  type='filled'
                  handleClick={handleExportImage}
                  disabled={productMutation.isLoading || storeProductMutation.isLoading}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AnimatePresence>
  )
}

export default EditorPage

{
  /* <button
  className="share"
  style={{ background: snap.color }}
  onClick={() => {
    const link = document.createElement('a')
    link.setAttribute('download', 'canvas.png')
    link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
    link.click()
  }}>
  DOWNLOAD
  <AiFillCamera size="1.3em" />
</button> */
}

// useEffect(() => {
//   const test = async () => {
//     if (!routeState && product) {
//       const variants = generateProductVariants({
//         _id: product._id,
//         price: product.price,
//         sizeGuides: product.sizeGuides
//       })
//       const response = await productApi.addProductVariants({ variants })
//       console.log(response)
//     }
//   }
//   test()
// }, [product, routeState])
