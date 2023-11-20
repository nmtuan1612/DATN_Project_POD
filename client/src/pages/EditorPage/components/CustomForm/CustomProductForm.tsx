import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import commonApi from 'src/apis/common.api'
import productApi from 'src/apis/product.api'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from 'src/components'
import { AppUrls } from 'src/config/config'
import { DecalTypes, EditorTabs, FilterTabs } from 'src/config/constants'
import { reader } from 'src/config/helpers'
import { slideAnimation } from 'src/config/motion'
import state from 'src/store'
import { PrintArea, Product, SampleProductDetail } from 'src/types/product.type'
import { generateProductVariants, isAxiosError } from 'src/utils/utils'
import '../../EditorPage.style.scss'
import { useSnapshot } from 'valtio'
import { AppContext } from 'src/context/app.context'

type Props = {
  refetch: any
  product: SampleProductDetail | Product
  productMutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>
  storeProductMutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>
}

type DecalType = keyof typeof DecalTypes

const CustomProductForm = ({ refetch, product, productMutation, storeProductMutation }: Props) => {
  const snap = useSnapshot(state)
  const { currentStore } = useContext(AppContext)
  const [activeEditorTab, setActiveEditorTab] = useState<string>(EditorTabs[0].name)
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoTab: true,
    stylishTab: false
  })
  const [prompt, setPrompt] = useState('')
  const [aiFile, setAiFile] = useState('')
  const [file, setFile] = useState<any>(null)

  const { state: routeState } = useLocation()
  const { productId } = useParams()
  const navigate = useNavigate()

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            aiFile={aiFile}
            setAiFile={setAiFile}
            handleDecals={handleDecals}
            // generatingImg={generatingImg}
            // handleSubmit={handleSubmitPrompt}
          />
        )
      default:
        return null
    }
  }

  const readFile = (type: DecalType) => {
    reader(file).then((result: any) => {
      // console.log('Read file result:', result)
      handleDecals(type, result)
      // setActiveEditorTab('')
    })
  }

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case 'logoTab':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishTab':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName as keyof typeof activeFilterTab]
      }
    })
  }

  const convertDetailsToHtml = (details: string[]) => {
    const result = details.reduce((result, detail) => (result += `<li>${detail}</li>`), '')
    return result
  }

  const handleDecals = (type: DecalType, result: string) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleSaveCustomModel = async () => {
    try {
      let logo,
        fullTexture = ''
      const { _id, modelMetaData, type, details, ...otherDetails } = product
      const image = document.querySelector('canvas')?.toDataURL('image/png')
      const { data: uploadResponse } = await commonApi.uploadBase64Image({ image })
      // state.rotate = [0, 3, 0]
      // const otherImage = document.querySelector('canvas')?.toDataURL('image/png')
      // const { data: uploadOtherResponse } = await commonApi.uploadBase64Image({ otherImage })

      // logo
      if (state.logoOrigin) {
        // file picker
        if (state.logoOrigin === EditorTabs[1].name) {
          const form = new FormData()
          const fileName = Date.now() + (file.name || 'logo')
          form.append('name', fileName)
          form.append('file', file)
          const { data } = await commonApi.uploadImage(form)
          logo = data ? data.url : ''
        } else {
          //ai picker
          const { data } = await commonApi.uploadBase64Image({ image: aiFile })
          logo = data ? data.url : ''
        }
      } else {
        logo = state.logoDecal
      }
      // full texture
      if (state.fullTextureOrigin) {
        // file picker
        if (state.fullTextureOrigin === state.logoOrigin) {
          fullTexture = logo
        } else if (state.fullTextureOrigin === EditorTabs[1].name) {
          const form = new FormData()
          const fileName = Date.now() + (file.name || 'full')
          form.append('name', fileName)
          form.append('file', file)
          const { data } = await commonApi.uploadImage(form)
          logo = data ? data.url : ''
        } else {
          //ai picker
          const { data } = await commonApi.uploadBase64Image({ image: aiFile })
          logo = data ? data.url : ''
        }
      } else {
        logo = state.logoDecal
      }

      const printAreas: PrintArea[] = Object.keys(activeFilterTab).reduce((list: string[], key) => {
        if (activeFilterTab[key as keyof typeof activeFilterTab]) {
          if (key === 'logoTab') {
            return [...list, 'logo']
          }
          if (key === 'stylishTab') {
            return [...list, 'full']
          }
          return list
        } else return list

        // return !activeFilterTab[key as keyof typeof activeFilterTab] ? list : key === 'logoTab' ? [...list, 'logo'] : [...list, 'full']
      }, [])

      const data = {
        ...otherDetails,
        // storeId: [],
        image: uploadResponse?.url || otherDetails.image,
        // otherImages: [...(otherDetails.otherImages as string[]), uploadOtherResponse?.url],
        customMetadata: {
          color: state.color,
          logo,
          fullTexture,
          logoPrintOptions: snap.logoPrintOptions,
          fullTexturePrintOptions: snap.fullTexturePrintOptions
        },
        details: [convertDetailsToHtml(details)],
        printAreas,
        rating: 5,
        sold: 0
      }

      if (routeState && routeState.productType === 'storeProduct') {
        // edit product
        await storeProductMutation.mutateAsync(data, {
          onSuccess(data) {
            navigate(AppUrls.shopProductDetail(productId as string))
            refetch()
          },
          onError(error) {
            if (isAxiosError(error)) {
              toast.error((error.response?.data as string) || '')
            }
          }
        })
      } else {
        // create product
        await productMutation.mutateAsync(
          { ...data, storeId: currentStore?._id, status: 'unpublished' },
          {
            onSuccess: async (data) => {
              const productId = data.data?.data?._id
              if (productId) {
                const variants = generateProductVariants({
                  _id: productId,
                  price: product.price,
                  sizeGuides: product.sizeGuides,
                  printAreas
                })
                await productApi.addProductVariants({ variants })

                navigate(AppUrls.shopProductDetail(productId), { state: { productType: 'newProduct' } })
              }
            },
            onError(error) {
              if (isAxiosError(error)) {
                toast.error((error.response?.data as string) || '')
              }
            }
          }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // <motion.div key='custom' className='absolute left-4 top-6 z-10' {...slideAnimation('left')}>
    <motion.div key='custom' className='absolute left-4 top-6 z-10'>
      <div className='flex min-h-full flex-col justify-between rounded-lg bg-white shadow-around'>
        {/* Tabs */}
        <div className='editorTabs-container h-[480px]'>
          <div className='flex w-[76px] flex-col gap-4'>
            {EditorTabs.map((tab) => (
              <Tab
                key={tab.name}
                isActiveTab={activeEditorTab === tab.name}
                tab={tab}
                handleClick={() => setActiveEditorTab(tab.name)}
              />
            ))}
          </div>
          {generateTabContent()}
        </div>
        {/* Footer */}
        <div className='flex hidden flex-col flex-wrap items-center gap-4'>
          {/* <div> */}
          <label className='relative mb-4 inline-flex cursor-pointer items-center'>
            <input type='checkbox' defaultValue='' className='peer sr-only' />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Toggle me</span>
          </label>
          <label className='relative mb-4 inline-flex cursor-pointer items-center'>
            <input type='checkbox' defaultValue='' className='peer sr-only' defaultChecked />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Checked toggle</span>
          </label>
          <label className='relative mb-3 inline-flex cursor-pointer items-center'>
            <input type='checkbox' defaultValue='' className='peer sr-only' disabled />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
            <span className='ml-3 text-sm font-medium text-gray-400 dark:text-gray-500'>Disabled toggle</span>
          </label>
          {/* </div> */}
        </div>
        <div className='flex flex-col flex-wrap gap-4 p-4 pt-0'>
          <h2 className='text-base font-semibold text-gray-600'>Print options</h2>
          <div className='z-10 flex w-full flex-wrap items-center justify-between px-4' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
                classStyle='border'
              />
            ))}
          </div>
          {/* Logo option */}
          <div className='flex flex-col px-4'>
            <div>
              <label htmlFor='logo-size' className='mb-2 block text-sm font-medium text-gray-900'>
                Logo size
              </label>
              <div className='flex items-center gap-4'>
                <input
                  id='logo-size'
                  type='range'
                  min={1}
                  max={20}
                  // step={0.5}
                  // value={Number(snap.logoPrintOptions.scale) * 20}
                  defaultValue={1}
                  className='h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200'
                  onChange={(e) => {
                    // state.logoPrintOptions.scale = Number(e.target.value) / 20
                    state.logoPrintOptions.scale = Number(e.target.value) * Number(product.modelMetaData.logoScale)
                  }}
                />
                {/* <span className='text-base font-semibold text-primary'>{Number(snap.logoPrintOptions.scale) * 20}</span> */}
                <span className='text-base font-semibold text-primary'>
                  {Number(snap.logoPrintOptions.scale).toFixed(2)}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor='logo-size' className='mb-2 block text-sm font-medium text-gray-900'>
                Cover texture size
              </label>
              <div className='flex items-center gap-4'>
                <input
                  id='cover-texture-size'
                  type='range'
                  min={1}
                  max={10}
                  defaultValue={1}
                  className='h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200'
                  onChange={(e) => {
                    // state.logoPrintOptions.scale = Number(e.target.value) / 20
                    state.fullTexturePrintOptions.scale =
                      Number(e.target.value) * Number(product.modelMetaData.textureScale)
                  }}
                />
                {/* <span className='text-base font-semibold text-primary'>{Number(snap.logoPrintOptions.scale) * 20}</span> */}
                <span className='text-base font-semibold text-primary'>
                  {Number(snap.fullTexturePrintOptions.scale).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomButton
        title='Save product'
        type='filled'
        customStyles='w-full mt-5'
        handleClick={handleSaveCustomModel}
        disabled={productMutation.isLoading || storeProductMutation.isLoading}
      />
    </motion.div>
  )
}

export default CustomProductForm
