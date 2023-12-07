import React, { useContext } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setAccessTokenToLS } from 'src/utils/auth'
import path from 'src/config/path'
import useGoogle from 'src/hooks/useGoogle'
import config from 'src/config/config'
import { AppContext } from 'src/context/app.context'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosError } from 'src/utils/utils'
import userApi from 'src/apis/user.api'
import { toast } from 'react-toastify'

type Props = {}
type FormData = Pick<Schema, 'password' | 'confirm_password'>

const ResetPasswordSchema = schema.pick(['password', 'confirm_password'])

const ResetPassword = (props: Props) => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const { state: routeState } = useLocation()
  const errorMessage = () => {
    console.log('Authenticate failed')
  }

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(ResetPasswordSchema)
  })

  const updateAccountMutation = useMutation(userApi.resetPassword)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updateData = {
        email: routeState.email,
        password: data.password
      }

      await updateAccountMutation.mutateAsync(updateData)

      toast.success('Your new password updated', { autoClose: 1000 })
      navigate(path.login)
    } catch (error) {
      isAxiosError(error) && toast.error(error.message)
    }
  })

  return (
    <div className='rounded-lg bg-white p-10 shadow-around'>
      <h1 className='mb-6 text-[36px] text-gray-500'>Change Password</h1>
      <div className='flex justify-center'>
        <form className='w-full' onSubmit={onSubmit}>
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

          <CustomButton
            title='Reset password'
            type='filled'
            isSubmitButton={true}
            disabled={updateAccountMutation.isLoading}
            isLoading={updateAccountMutation.isLoading}
            customStyles={`mr-1 rounded-lg border-[1px] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80 md:mr-2 md:px-5 md:py-2.5`}
          />
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
