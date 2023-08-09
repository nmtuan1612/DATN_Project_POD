import React, { useState, useEffect } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { setAccessTokenToLS, setProfileToLS } from 'src/utils/auth'
import path from 'src/config/path'

type Props = {}

const Login = (props: Props) => {
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const navigate = useNavigate()
  function parseJwt(token: string) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }
  const loginSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      console.log(
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkNDhhNzUxMzhkOWQ0OGYwYWE2MzVlZjU2OWM0ZTE5NmY3YWU4ZDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2OTA4MTA2MjAsImF1ZCI6IjY2NTQ5MTg4ODgzMy02NzQzMHFtdWJwZ3ZsdDdubW9hN21waTdsMmE2MTNrbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNTQyNDE3MDI5OTEzNTU3NTU1OSIsImVtYWlsIjoidHVhbjJrZHphaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNjY1NDkxODg4ODMzLTY3NDMwcW11YnBndmx0N25tb2E3bXBpN2wyYTYxM2ttLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6Ik5ndXnhu4VuIE3huqFuaCBUdeG6pW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0Y1UyZ2x0cWlaYkZIZHhjZXJPM0xkemtEcDdad2h5YXVYRnF4dU9XZXhOQXkwPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5ndXnhu4VuIE3huqFuaCBUdeG6pW4iLCJpYXQiOjE2OTA4MTA5MjAsImV4cCI6MTY5MDgxNDUyMCwianRpIjoiZjEzNGFiMzVmM2E5Nzc4ZWY2NWRjODViOTFmMjY0ZTMwNzZlNjRmZSJ9.ypEcoATvLL_8dfbXBVqWct09egIJYiAO77Wri9ZTZIb3h3fdpoYiHlnTRasqW_49gX1bo1gbtwXsKT9HUs-FhLh8S3EZJ2xUTh0OydhVFagHX5_OOue4Mb7WHE5SeXc5z4tIOMt1qpVIWnE_YrVStSNo2Q8Nal_y77Ye_6p2sqKZY83xWuFlp_WY_Kw_-iO1GHjJc5ID1Xv1W2gJWGNHHZyX91MS1vd4-rvJHNA2JGxFBdmUG8VxPquGaJGYn19E1OBvQscntxUPEd8WQay45rXoIMuK7HQmoYLSlFAzyU5FjzRgmZrU9UUIo-JdqbM9wYMz-fjFR9F_8Ese5hFlzw' ===
          response.credential
      )
      const userInfo = parseJwt(response.credential)
      setAccessTokenToLS(response.credential)
      setProfileToLS(userInfo)
      navigate('/')
      console.log('userInfo:', userInfo)
    }
  }
  const errorMessage = () => {
    console.log('Authenticate failed')
  }

  return (
    <div className='rounded-lg bg-white p-10 shadow-around'>
      <h1 className='mb-6 text-[36px] text-gray-500'>Sign in</h1>
      <div className='flex flex-col items-center'>
        <div className='flex w-full justify-center'>
          <GoogleLogin onSuccess={loginSuccess} onError={errorMessage} />
        </div>
        <div className='relative flex w-full items-center py-5'>
          <div className='flex-grow border-t border-gray-200'></div>
          <span className='mx-4 flex-shrink text-sm text-gray-400'>or sign in with</span>
          <div className='flex-grow border-t border-gray-200'></div>
        </div>
        <div className='w-full'>
          <div className='mb-6'>
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
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                placeholder='Your email'
              />
            </div>
            {/* <p className='mt-2 text-sm text-green-600 dark:text-green-500'>
              <span className='font-medium'>Alright!</span> Username available!
            </p> */}
          </div>
          <div className='mb-6'>
            <label htmlFor='email-address-icon' className='mb-2 block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5'>
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
              <input
                type='text'
                id='email-address-icon'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-0'
                placeholder='Your password'
              />
            </div>
            {/* <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> Username already taken!
            </p> */}
          </div>
          <CustomButton title='Sign in' type='filled' handleClick={() => {}} customStyles='w-full text-white' />
          <div className='mt-6 flex items-center justify-between'>
            <div className='text-sm text-gray-400'>
              New to CreoPrint?{' '}
              <Link to={path.register} className='ml-1 text-primary'>
                Sign up
              </Link>
            </div>
            <span className='text-sm text-primary'>Forgot password?</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
