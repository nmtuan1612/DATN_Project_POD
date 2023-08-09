import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <div id='error-page' className='flex h-screen flex-col items-center justify-center '>
      <h1 className='mb-8 text-2xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='mt-6 text-gray-300'>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}

export default ErrorPage
