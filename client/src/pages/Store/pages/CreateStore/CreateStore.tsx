import classNames from 'classnames'
import React, { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CustomButton } from 'src/components'
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs'
import Input from 'src/components/Input'
import InputFile from 'src/components/InputFile'
import { getLogoUrl } from 'src/utils/utils'

type Props = {}

const CreateStore = (props: Props) => {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError
  } = useForm({})
  const logo = watch('logo')
  const storeName = watch('storeName')
  const storeDescription = watch('storeDescription')
  const acceptTerm = watch('acceptTerm')

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='container py-4 md:py-6'>
      <BreadCrumbs />
      <h2 className='mt-6 text-2xl font-semibold text-gray-900'>Create CreoPrint store</h2>
      <form className='mt-8 pl-10' onSubmit={onSubmit}>
        <ol className='relative border-l border-gray-200 text-gray-500'>
          {/* Step 1 */}
          <li className='mb-6 ml-6 grid grid-cols-6 md:grid-cols-12'>
            <span
              className={classNames(
                'absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white',
                {
                  'bg-purple-100': storeName,
                  'bg-gray-100': !storeName
                }
              )}
            >
              {storeName ? (
                <svg
                  className='h-3.5 w-3.5 text-primary'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 16 12'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M1 5.917 5.724 10.5 15 1.5'
                  />
                </svg>
              ) : (
                <svg
                  className='h-3.5 w-3.5 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 20'
                >
                  <path d='M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z' />
                </svg>
              )}
            </span>
            <div className='col-span-2'>
              <p className='text-sm'>Step 1</p>
              <h3 className='font-medium leading-tight'>Store Name</h3>
            </div>
            <div className='col-span-4 flex flex-1 flex-col gap-5 md:col-span-10'>
              <h3 className='flex items-center gap-2 text-sm italic text-gray-500'>
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
                Choose a unique name for your new store <br />
                {/* Displayed in store and on the “Ship from” field on shipping labels */}
              </h3>
              <div className=''>
                <label htmlFor='store-name' className='mb-2 block font-medium text-gray-700'>
                  Store name <span className='text-sm text-red-600'>*</span>
                </label>
                <Input
                  name='storeName'
                  id='store-name'
                  register={register}
                  //   errorMessage={errors.storeName?.message}
                  classNameInput='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                  placeholder='Your store name'
                  autoComplete='on'
                />
              </div>
            </div>
          </li>
          {/* Step 2 */}
          <li className='mb-6 ml-6 grid grid-cols-6 md:grid-cols-12'>
            <span
              className={classNames(
                'absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white',
                {
                  'bg-purple-100': storeDescription,
                  'bg-gray-100': !storeDescription
                }
              )}
            >
              {storeDescription ? (
                <svg
                  className='h-3.5 w-3.5 text-primary'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 16 12'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M1 5.917 5.724 10.5 15 1.5'
                  />
                </svg>
              ) : (
                <svg
                  className='h-3.5 w-3.5 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 16'
                >
                  <path d='M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z' />
                </svg>
              )}
            </span>
            <div className='col-span-2'>
              <p className='text-sm'>Step 2</p>
              <h3 className='font-medium leading-tight'>Store Details</h3>
            </div>
            <div className='col-span-4 flex flex-1 flex-col gap-5 md:col-span-10'>
              <h3 className='flex items-center gap-2 text-sm italic text-gray-500'>
                Add some information for your store
              </h3>
              <div className=''>
                <label htmlFor='store-name' className='mb-2 block font-medium text-gray-700'>
                  Store logo
                </label>
                <div className='mb-2 flex items-center gap-4'>
                  <InputFile onChange={handleChangeFile} />
                  <div className='my-2 h-[106px] w-[106px] border-2 '>
                    <img src={previewImage || getLogoUrl(logo)} alt='' className='h-full w-full object-cover' />
                  </div>
                </div>
                <label htmlFor='store-desc' className='mb-2 block font-medium text-gray-700'>
                  Store description <span className='text-sm text-red-600'>*</span>
                </label>
                <textarea
                  id='store-desc'
                  cols={30}
                  rows={8}
                  disabled={!storeName}
                  {...register('storeDescription')}
                  placeholder='Your store description...'
                  className={classNames(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0',
                    {
                      'cursor-text': storeName,
                      'cursor-not-allowed': !storeName
                    }
                  )}
                />
                <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{/* {errors.email?.message} */}</p>
              </div>
            </div>
          </li>
          {/* Step 3 */}
          <li className='mb-6 ml-6 grid grid-cols-6 md:grid-cols-12'>
            <span
              className={classNames(
                'absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white',
                {
                  'bg-purple-100': acceptTerm,
                  'bg-gray-100': !acceptTerm
                }
              )}
            >
              {acceptTerm ? (
                <svg
                  className='h-3.5 w-3.5 text-primary'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 16 12'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M1 5.917 5.724 10.5 15 1.5'
                  />
                </svg>
              ) : (
                <svg
                  className='h-3.5 w-3.5 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 20'
                >
                  <path d='M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z' />
                </svg>
              )}
            </span>
            <div className='col-span-2'>
              <p className='text-sm'>Step 3</p>
              <h3 className='font-medium leading-tight'>Confirmation</h3>
            </div>
            <div className='col-span-4 flex flex-1 flex-col gap-5 md:col-span-10'>
              <div className=''>
                <h3 className='mb-2 block text-xl font-medium text-gray-700'>Terms of Service</h3>
                <div>
                  <input
                    id='term-checkbox'
                    type='checkbox'
                    disabled={!storeName || !storeDescription}
                    {...register('acceptTerm')}
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
                  />
                  <label htmlFor='term-checkbox' className='ml-2 text-sm font-medium text-gray-500'>
                    I understand and accept the{' '}
                    <Link to='' className='text-primary hover:text-purple-500'>
                      Terms of Service
                    </Link>{' '}
                    when creating a CreoPrint store.
                  </label>
                </div>
              </div>

              <div className=''>
                <CustomButton
                  type='filled'
                  title='Create store'
                  isSubmitButton
                  disabled={!acceptTerm}
                  customStyles='float-right'
                />
              </div>
            </div>
          </li>
        </ol>
      </form>
    </div>
  )
}

export default CreateStore
