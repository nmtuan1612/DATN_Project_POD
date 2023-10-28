import React from 'react'
import { useForm } from 'react-hook-form'
import productApi from 'src/apis/product.api'
import { CustomButton } from 'src/components'
import Input from 'src/components/Input'
import { AccessoriesTypes, ClothingTypes, HomeAndLivingTypes } from 'src/config/constants'
import { bottleSizes, dressSizeGuides, sizeGuides } from 'src/config/mockData'
import { Categories } from 'src/config/constants'

type Props = {}
const types = [...ClothingTypes, ...HomeAndLivingTypes, ...AccessoriesTypes]

const AddSample = (props: Props) => {
  const { register, handleSubmit } = useForm()
  const onSubmit = handleSubmit(async (data) => {
    console.log('data:', data)
    const product = {
      ...data,
      categoryIds: data.categoryIds.split(', '),
      //   .map((id: string) => {
      //     const cat = Categories.find((cat) => cat.id === id)
      //     return { id: cat?.id, name: cat?.name }
      //   }),
      details: data.details.split(', '),
      otherImages: data.otherImages.split(', '),
      // type: types.filter((item) => item._id === data.type)[0]._id,
      sizeGuides: sizeGuides,
      price: Number(data.price)
      // sizeGuides: dressSizeGuides
      //   sizeGuides: bottleSizes
    }
    await productApi.addSample(product)
  })

  return (
    <div className='container overflow-scroll py-4 md:py-6'>
      <h2 className='text-2xl font-bold text-gray-800'>AddSample</h2>
      <form className='mt-4' onSubmit={onSubmit}>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Product name <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='name'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Category Ids <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='categoryIds'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Description <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='description'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Details <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='details'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Print brand id <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='printBrand'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Price <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='price'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Model ID <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='modelId'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Image <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='image'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Other Images
          </label>
          <Input
            className='group'
            id='name'
            name='otherImages'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Type <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='typeId'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block font-medium text-gray-700'>
            Hidden tag <span className='text-sm text-red-600'>*</span>
          </label>
          <Input
            className='group'
            id='name'
            name='hiddenTag'
            register={register}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        <CustomButton title='Submit' type='filled' isSubmitButton={true} />
      </form>
    </div>
  )
}

export default AddSample
