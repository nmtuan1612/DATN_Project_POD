import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import Modal from 'src/components/Modal/Modal'
import useMyStores from 'src/hooks/useMyStores'
import { Product } from 'src/types/product.type'
import { generateProductVariants } from 'src/utils/utils'

type Props = {
  visible: boolean
  listIds: string[]
  onCancel: () => void
  products: Product[]
}

const CopyProductsToStoresModal = ({ visible, listIds, onCancel, products }: Props) => {
  const [selectedStores, setSelectedStores] = useState<string[]>([])

  const { storeList, isLoading } = useMyStores()
  const { shopId } = useParams()

  const otherStores = useMemo(() => {
    return storeList ? storeList.filter((store) => store._id !== shopId) : []
  }, [storeList, shopId])

  const handleSelectStore = (id: string) => {
    setSelectedStores((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleCopyToStores = async () => {
    if (selectedStores?.length) {
      const selectedProducts = products.filter((product) => listIds.includes(product._id))
      // console.log(selectedProducts)

      for (const storeId of selectedStores) {
        for (const product of selectedProducts) {
          const { _id, ...otherDetails } = product
          const newProduct = await productApi.addStoreProduct({ ...otherDetails, variants: [], storeId: storeId })
          const productId = newProduct?.data?.data?._id
          if (productId) {
            const variants = generateProductVariants({
              _id: productId,
              price: product.price,
              sizeGuides: product.sizeGuides,
              printAreas: product.printAreas
            })
            await productApi.addProductVariants({ variants })
          }
        }
      }
      toast.success(`${selectedProducts.length} products copied to ${selectedStores.length} stores.`, {
        autoClose: 1000
      })
      onCancel()
    } else {
      toast.error('Select store to copy to', { autoClose: 1000 })
    }
  }

  return (
    <Modal
      visible={visible}
      title={`Copy ${listIds?.length} products to ...`}
      onOk={handleCopyToStores}
      onCancel={onCancel}
      canOk={selectedStores?.length > 0}
    >
      <div className=''>
        <p className='flex items-center gap-2 text-sm italic text-gray-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='h-5 w-5 text-primary'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
              clipRule='evenodd'
            />
          </svg>
          You can choose one or more stores below.
        </p>
        <ul className='mt-4 flex flex-col gap-2 divide-y'>
          {isLoading ? (
            <></>
          ) : (
            otherStores.map((store) => (
              <li key={store._id} className='flex items-center gap-2 px-6 py-2 hover:bg-gray-100'>
                <input
                  id={`checkbox-${store._id}`}
                  type='checkbox'
                  checked={selectedStores.includes(store._id)}
                  onChange={() => handleSelectStore(store._id)}
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
                />
                <label htmlFor={`checkbox-${store._id}`}>{store.storeName}</label>
              </li>
            ))
          )}
        </ul>
      </div>
    </Modal>
  )
}

export default CopyProductsToStoresModal
