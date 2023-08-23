import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import { CustomButton } from 'src/components'
import Input from 'src/components/Input'
import { AppContext } from 'src/context/app.context'
import { User } from 'src/types/user.type'
import { setProfileToLS } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosError } from 'src/utils/utils'

type Props = {}
type FormData = Pick<
  UserSchema,
  'businessName' | 'fullName' | 'email' | 'phoneNumber' | 'country' | 'city' | 'province' | 'addressDetail' | 'zipCode'
>

const profileSchema = userSchema.pick([
  'businessName',
  'fullName',
  'email',
  'phoneNumber',
  'country',
  'city',
  'province',
  'addressDetail',
  'zipCode'
])

const UserDetail = (props: Props) => {
  const { profile, setProfile } = useContext(AppContext)
  const { data: user, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getUser({ id: profile?._id || '' })
  })
  const updateAccountMutation = useMutation(userApi.updateAccount)

  const profileData: User = user?.data

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: profile?.email || '',
      phoneNumber: '',
      country: '',
      city: '',
      province: '',
      addressDetail: ''
    },
    resolver: yupResolver<FormData>(profileSchema)
  })

  useEffect(() => {
    if (profileData) {
      setValue('businessName', profileData.businessName)
      setValue('fullName', profileData.fullName)
      setValue('email', profileData.email)
      setValue('phoneNumber', profileData.phoneNumber)
      setValue('country', profileData.address?.country)
      setValue('city', profileData.address?.city)
      setValue('province', profileData.address?.province)
      setValue('addressDetail', profileData.address?.addressDetail)
      setValue('zipCode', profileData.address?.zipCode)
    }
  }, [profileData])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updateData = {
        businessName: data.businessName,
        fullName: data.fullName,
        email: data.email,
        address: {
          country: data.country,
          city: data.city,
          province: data.province,
          addressDetail: data.addressDetail,
          zipCode: data.zipCode
        },
        phoneNumber: data.phoneNumber
      }

      const response = await updateAccountMutation.mutateAsync(updateData)
      setProfile(response.data?.data)
      setProfileToLS(response.data?.data)
      refetch()
      toast.success(response.data?.message)
    } catch (error) {
      isAxiosError(error) && toast.error(error.message)
    }
  })

  const onCancel = () => {
    if (profileData) {
      reset({
        ...profileData,
        country: profileData.address?.country,
        city: profileData.address?.city,
        province: profileData.address?.province,
        addressDetail: profileData.address?.addressDetail,
        zipCode: profileData.address?.zipCode
      })
    } else {
      reset()
    }
  }

  return (
    <div className='container'>
      <h2 className='text-2xl font-semibold text-gray-900'>Account Details</h2>
      <form className='mt-8 flex flex-col' onSubmit={onSubmit}>
        <div className='w-full'>
          <h3 className='mb-3 text-lg font-semibold text-gray-900'>Business Name</h3>
          <Input
            className='group'
            id='business_name'
            name='businessName'
            label='Name of Business'
            register={register}
            errorMessage={errors.businessName?.message}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        {/* Contact */}
        <div className='w-full'>
          <h3 className='mb-3 font-semibold text-gray-900'>Contact details</h3>
          <Input
            className='group'
            id='full_name'
            name='fullName'
            label='Full name'
            register={register}
            errorMessage={errors.fullName?.message}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
          <Input
            className='group'
            id='email'
            name='email'
            label='Email'
            register={register}
            errorMessage={errors.email?.message}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
          <Input
            className='group'
            id='phone_number'
            name='phoneNumber'
            label='Phone number'
            register={register}
            errorMessage={errors.phoneNumber?.message}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        {/* Address */}
        <div className='w-full'>
          <h3 className='mb-3 font-semibold text-gray-900'>Address</h3>
          <div className='flex w-full flex-col gap-3 md:flex-row'>
            <div className='relative flex-1'>
              <label
                htmlFor='country'
                className='absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 placeholder-shown:top-1/2 placeholder-shown:-translate-y-1/2 placeholder-shown:scale-100 focus:top-2 focus:-translate-y-4 focus:scale-75 focus:px-2 focus:text-primary'
              >
                Country
              </label>
              <select
                // type='select'
                id='country'
                name='country'
                className='peer relative block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
              >
                {/* <div className='absolute right-0 top-full bg-white shadow-lg'> */}
                <option>Vietnam</option>
                <option>Thailan</option>
                <option>USA</option>
                {/* </div> */}
              </select>
            </div>
            <Input
              className='group flex-1'
              id='province'
              name='province'
              label='Province'
              register={register}
              errorMessage={errors.province?.message}
              classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
            />
          </div>
          <Input
            className='group'
            id='address_line_1'
            name='addressDetail'
            label='Address detail'
            register={register}
            errorMessage={errors.addressDetail?.message}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
          <div className='flex w-full flex-col gap-3 md:flex-row'>
            <Input
              className='group flex-1'
              id='city'
              label='City'
              name='city'
              register={register}
              errorMessage={errors.city?.message}
              classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
            />
            <Input
              className='group flex-1'
              id='zip_code'
              label='ZIP code'
              name='zipCode'
              register={register}
              errorMessage={errors.zipCode?.message}
              classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
            />
          </div>
        </div>
        {/* Submit */}
        <h4 className='text-gray-500'>These information will appear on your invoices</h4>
        <div className='flex items-center justify-end'>
          <CustomButton
            title='Cancel'
            type='outline'
            handleClick={onCancel}
            customStyles='mr-1 text-gray-800 hover:bg-gray-50 focus:outline-none md:mr-2'
          />
          <CustomButton
            title='Save'
            type='filled'
            isSubmitButton={true}
            isLoading={updateAccountMutation.isLoading}
            disabled={updateAccountMutation.isLoading}
            customStyles={`mr-1 rounded-lg border-[1px] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80 md:mr-2 md:px-5 md:py-2.5`}
          />
        </div>
      </form>
    </div>
  )
}

export default UserDetail

{
  /* <input
  type='text'
  id='floating_outlined'
  className='border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
  placeholder=' '
/>
<label
  htmlFor='business_name'
  className='absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary'
>
  Floating outlined
</label> */
}
