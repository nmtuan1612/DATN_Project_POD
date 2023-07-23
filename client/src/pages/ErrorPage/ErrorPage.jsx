import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div id='error-page' className='flex h-screen flex-col items-center justify-center '>
      <h1 className='mb-8 text-2xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='color-grey-200 mt-6'>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
