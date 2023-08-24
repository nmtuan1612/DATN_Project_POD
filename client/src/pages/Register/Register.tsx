import React, { useContext } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
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

type Props = {}
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

const Register = (props: Props) => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const { handleGoogle } = useGoogle({ url: `${config.development.backendUrl}${path.register}` })

  const loginSuccess = (response: CredentialResponse) => {
    handleGoogle(response)
  }
  const errorMessage = () => {
    console.log('Authenticate failed')
  }

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => {
          setIsAuthenticated(true)
          setProfile(data.data.user)
          navigate('/')
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            setError('confirm_password', { message: error.response?.data as string, type: 'Server' })
          }
        }
      }
    )
  })

  return (
    <div className='rounded-lg bg-white p-10 shadow-around'>
      <h1 className='mb-6 text-[36px] text-gray-500'>Sign up</h1>
      <div className='flex flex-col items-center'>
        <div className='flex w-full justify-center'>
          <GoogleLogin onSuccess={loginSuccess} onError={errorMessage} />
        </div>
        <div className='relative flex w-full items-center py-5'>
          <div className='flex-grow border-t border-gray-200'></div>
          <span className='mx-4 flex-shrink text-sm text-gray-400'>or sign up with</span>
          <div className='flex-grow border-t border-gray-200'></div>
        </div>
        <form className='w-full' onSubmit={onSubmit}>
          <div className='mb-2'>
            <label htmlFor='email-address-icon' className='mb-2 block text-sm font-medium text-gray-700'>
              Email
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5'>
                <svg
                  className='h-4 w-4 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 16'
                >
                  <path d='m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z' />
                  <path d='M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z' />
                </svg>
              </div>
              <input
                type='text'
                id='email-address-icon'
                {...register('email')}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                placeholder='Your email'
              />
            </div>
            <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.email?.message}</p>
          </div>
          <div className='mb-1'>
            <label htmlFor='email-address-icon' className='mb-2 block text-sm font-medium text-gray-700'>
              Password
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
                id='email-address-icon'
                register={register}
                errorMessage={errors.password?.message}
                classNameInput='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                classNameEye='absolute right-3.5 h-5 w-5 cursor-pointer top-[12px] text-gray-700'
                placeholder='Your password'
                disabled={registerMutation.isLoading}
                autoComplete='on'
              />
            </div>
          </div>
          <div className='mb-1'>
            <label htmlFor='email-address-icon' className='mb-2 block text-sm font-medium text-gray-700'>
              Confirm Password
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
                id='email-address-icon'
                register={register}
                errorMessage={errors.confirm_password?.message}
                classNameInput='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                classNameEye='absolute right-3.5 h-5 w-5 cursor-pointer top-[12px] text-gray-700'
                placeholder='Your confirm password'
                disabled={registerMutation.isLoading}
                autoComplete='on'
              />
            </div>
          </div>
          <div className='my-4 text-xs text-gray-400'>
            By Sign up, you agree to our
            <Link to={'#'} className='ml-1 text-primary'>
              Terms of Service
            </Link>{' '}
            and
            <Link to={'#'} className='ml-1 text-primary'>
              Privacy Policy
            </Link>
          </div>

          <CustomButton
            title='Sign up'
            type='filled'
            isSubmitButton={true}
            customStyles='w-full text-white'
            isLoading={registerMutation.isLoading}
            disabled={registerMutation.isLoading}
          />

          <div className='mt-6 text-sm text-gray-400'>
            Already have an account?{' '}
            <Link to={path.login} className='ml-1 text-primary'>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
