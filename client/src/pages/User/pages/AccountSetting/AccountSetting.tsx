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
type FormData = Pick<UserSchema, 'password' | 'confirm_password'>

const profileSchema = userSchema.pick(['password', 'confirm_password'])

const AccountSetting = (props: Props) => {
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
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver<FormData>(profileSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updateData = {
        password: data.password
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
    reset()
  }

  return (
    <div className='container'>
      <h2 className='text-2xl font-semibold text-gray-900'>Security Settings</h2>
      <form className='mt-8 flex flex-col' onSubmit={onSubmit}>
        <div className='w-full'>
          <label htmlFor='email-address-icon' className='mb-2 block text-sm font-medium text-gray-700'>
            Email
          </label>
          <Input
            className='group'
            id='email'
            name='email'
            // label='Email'
            value={profile?.email}
            disabled={true}
            classNameInput='border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-primary focus:outline-none focus:ring-0'
          />
        </div>
        {/* Edit password */}
        <div className='mb-1'>
          <label htmlFor='new_password_input' className='mb-2 block text-sm font-medium text-gray-700'>
            New Password
          </label>
          <div className='relative'>
            <div className='pointer-events-none absolute left-0 top-[20%] z-10 flex items-center pl-3.5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='h-4 w-4 text-gray-500'
              >
                <path
                  fillRule='evenodd'
                  d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <Input
              name='password'
              type='password'
              id='new_password_input'
              register={register}
              errorMessage={errors.password?.message}
              classNameInput='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
              classNameEye='absolute right-3.5 h-5 w-5 cursor-pointer top-[12px] text-gray-700'
              placeholder='Your new password'
              autoComplete='on'
            />
          </div>
        </div>
        {/* Confirm */}
        <div className='mb-1'>
          <label htmlFor='confirm_password_input' className='mb-2 block text-sm font-medium text-gray-700'>
            Confirm New Password
          </label>
          <div className='relative'>
            <div className='pointer-events-none absolute left-0 top-[20%] z-10 flex items-center pl-3.5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='h-4 w-4 text-gray-500'
              >
                <path
                  fillRule='evenodd'
                  d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <Input
              name='confirm_password'
              type='password'
              id='confirm_password_input'
              register={register}
              errorMessage={errors.confirm_password?.message}
              classNameInput='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
              classNameEye='absolute right-3.5 h-5 w-5 cursor-pointer top-[12px] text-gray-700'
              placeholder='Your confirm password'
              autoComplete='on'
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
          {/* <button
            type='submit'
            className={`mr-1 rounded-lg border-[1px] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80 md:mr-2 md:px-5 md:py-2.5`}
          >
            Save
          </button> */}
          <CustomButton
            title='Save'
            type='filled'
            isSubmitButton={true}
            disabled={updateAccountMutation.isLoading}
            isLoading={updateAccountMutation.isLoading}
            customStyles={`mr-1 rounded-lg border-[1px] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80 md:mr-2 md:px-5 md:py-2.5`}
          />
        </div>
      </form>
    </div>
  )
}

export default AccountSetting
