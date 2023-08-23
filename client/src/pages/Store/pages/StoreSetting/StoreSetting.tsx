import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import commonApi from 'src/apis/common.api'
import storeApi from 'src/apis/store.api'
import { CustomButton } from 'src/components'
import Input from 'src/components/Input'
import InputFile from 'src/components/InputFile'
import { AppContext } from 'src/context/app.context'
import { Store } from 'src/types/store.type'
import { setStoreToLS } from 'src/utils/auth'
import { StoreSchema, storeSchema } from 'src/utils/rules'
import { isAxiosError } from 'src/utils/utils'

type Props = {}
type FormBody = Omit<StoreSchema, 'acceptTerm'>
const formSchema = storeSchema.omit(['acceptTerm'])

const StoreSetting = (props: Props) => {
  const { currentStore, setCurrentStore } = useContext(AppContext)
  const [file, setFile] = useState<File>()

  const navigate = useNavigate()
  const { shopId } = useParams()

  const { data: storeData, refetch } = useQuery({
    queryKey: ['store', shopId],
    queryFn: () => storeApi.getStoreWithId({ id: shopId as string })
  })
  const store: Store = storeData?.data?.data

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    reset
  } = useForm<FormBody>({
    resolver: yupResolver<FormBody>(formSchema)
  })

  const storeMutation = useMutation({ mutationFn: (body: FormBody) => storeApi.updateStore(store?._id, body) })

  useEffect(() => {
    if (store) {
      setCurrentStore(store)
      setStoreToLS(store)
      setValue('storeName', store.storeName)
      setValue('storeDescription', store.storeDescription)
      setValue('logo', store.logo)
    }
  }, [store])

  const logo = watch('logo')

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      let logoUrl = ''
      if (file) {
        const form = new FormData()
        const fileName = Date.now() + file.name
        form.append('name', fileName)
        form.append('file', file)
        const { data: uploadResponse } = await commonApi.uploadImage(form)
        logoUrl = uploadResponse?.url || ''
        setValue('logo', uploadResponse?.url || '')
      }
      await storeMutation.mutateAsync(
        {
          ...data,
          logo: logoUrl
        },
        {
          onSuccess: (data) => {
            toast.success(data.data?.message)
            setCurrentStore(data.data?.data)
            setStoreToLS(data.data?.data)
            refetch()
          },
          onError(error) {
            if (isAxiosError(error)) {
              toast.error((error.response?.data as string) || '')
              setError('storeName', { message: error.response?.data as string })
            }
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  })

  const onSubmit1 = () => {
    console.log('alo')
  }

  const onCancel = () => {
    store &&
      reset({
        storeName: store.storeName,
        storeDescription: store.storeDescription,
        logo: store.logo
      })
  }

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div>
      <form className='mt-8 px-6' onSubmit={onSubmit}>
        {/* name */}
        <div className='mb-4'>
          <div className='flex flex-1 flex-col gap-5'>
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
              {/* Choose a unique name for your new store <br /> */}
              Displayed in store and on the “Ship from” field on shipping labels
            </h3>
            <div className=''>
              <label htmlFor='store-name' className='mb-2 block font-medium text-gray-700'>
                Store name <span className='text-sm text-red-600'>*</span>
              </label>
              <Input
                name='storeName'
                id='store-name'
                register={register}
                errorMessage={errors.storeName?.message}
                classNameInput='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                placeholder='Your store name'
                autoComplete='on'
              />
            </div>
          </div>
        </div>
        {/* logo */}
        <div className='mb-[2.25rem]'>
          <label htmlFor='store-name' className='mb-2 block font-medium text-gray-700'>
            Store logo
          </label>
          <div className='mb-2 flex items-center gap-4'>
            <InputFile onChange={handleChangeFile} />
            <div className='my-2 h-[106px] w-[106px] border-2 '>
              <img src={previewImage || logo} alt='' className='h-full w-full object-cover' />
            </div>
          </div>
        </div>
        {/* Desc */}
        <div className='mb-4'>
          <label htmlFor='store-desc' className='mb-2 block font-medium text-gray-700'>
            Store description <span className='text-sm text-red-600'>*</span>
          </label>
          <textarea
            id='store-desc'
            cols={30}
            rows={8}
            {...register('storeDescription')}
            placeholder='Your store description...'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
          />
          <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.storeDescription?.message}</p>
        </div>
        {/* Step 3 */}
        <div className='mb-6 '>
          <h3 className='mb-2 block text-xl font-medium text-gray-700'>Terms of Service</h3>

          <p className='ml-2 text-sm font-medium text-gray-500'>
            You’ve already agreed to our{' '}
            <Link to='' className='text-primary hover:text-purple-500'>
              Terms of Service
            </Link>{' '}
            when creating a CreoPrint store. You can review them anytime using the link above.
          </p>
        </div>
        <div className='flex items-center justify-end'>
          <CustomButton
            title='Cancel'
            type='outline'
            handleClick={onCancel}
            customStyles='mr-1 text-gray-800 hover:bg-gray-50 focus:outline-none md:mr-2'
          />
          <CustomButton
            type='filled'
            title='Save'
            isSubmitButton={true}
            isLoading={storeMutation.isLoading}
            disabled={storeMutation.isLoading}
            customStyles=''
          />
        </div>
      </form>
    </div>
  )
}

export default StoreSetting
