import React, { useState, useEffect, useContext } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { GoogleLogin, useGoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { setAccessTokenToLS, setProfileToLS } from 'src/utils/auth'
import path from 'src/config/path'
import useGoogle from 'src/hooks/useGoogle'
import config from 'src/config/config'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { AppContext } from 'src/context/app.context'
import { isAxiosError } from 'src/utils/utils'
import Input from 'src/components/Input'
import http from 'src/utils/http'
import commonApi from 'src/apis/common.api'
import classNames from 'classnames'

type Props = {}
type FormData = Pick<Schema, 'email'>

const loginSchema = schema.pick(['email'])

const ForgotPassword = (props: Props) => {
  const { otp, setOtp } = useContext(AppContext)

  const [timerCount, setTimer] = React.useState(60)
  const [OTPinput, setOTPinput] = useState(['0', '0', '0', '0'])
  //   const [openOtpForm]
  const [disable, setDisable] = useState(true)

  const navigate = useNavigate()

  //   useEffect(() => {
  //     if (error) {
  //       toast.error(error, { position: 'top-center', autoClose: 1000 })
  //     }
  //   }, [error])

  const {
    register,
    setError,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const sendMutation = useMutation({
    mutationKey: ['send_otp'],
    mutationFn: (body: any) => commonApi.sendRecoveryEmail(body)
  })

  const onSubmit = handleSubmit((data) => {
    const OTP = Math.floor(Math.random() * 9000 + 1000)
    sendMutation.mutate(
      {
        OTP,
        recipient_email: data.email
      },
      {
        onSuccess: (data) => {
          setOtp(OTP)
        },
        onError: (error) => {
          toast.error('Send OTP failed')
        }
      }
    )
  })
  console.log(otp)
  function resendOTP() {
    if (disable) return
    http
      .post('/email/send_recovery_email', {
        OTP: otp,
        recipient_email: getValues('email')
      })
      .then(() => setDisable(true))
      .then(() => toast.success('A new OTP has successfully been sent to your email.'))
      .then(() => setTimer(60))
      .catch(console.log)
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join('')) === otp) {
      navigate(path.resetPassword, { state: { email: getValues('email') } })
      return
    }
    toast.error('The code you have entered is not correct, try again or re-send the link')
    return
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval)
        if (lastTimerCount <= 1) setDisable(false)
        if (lastTimerCount <= 0) return lastTimerCount
        return lastTimerCount - 1
      })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval)
  }, [disable])

  return (
    <div className='rounded-lg bg-white p-10 pt-8 shadow-around'>
      {otp !== 0 ? (
        <>
          <div className='mb-6 flex flex-col items-center justify-center space-y-2 text-center'>
            <div className='text-[36px] font-semibold text-gray-500'>
              <p>Email Verification</p>
            </div>
            <div className='flex flex-row text-sm font-medium text-gray-400'>
              <p>We have sent a code to your email {getValues('email')}</p>
            </div>
          </div>
          <div>
            <form>
              <div className='flex flex-col space-y-16'>
                <div className='mx-auto flex w-full max-w-xs flex-row items-center justify-between'>
                  <div className='h-16 w-16 '>
                    <input
                      maxLength={1}
                      className='flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-primary focus:bg-gray-50 focus:ring-1'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => setOTPinput([e.target.value, OTPinput[1], OTPinput[2], OTPinput[3]])}
                    ></input>
                  </div>
                  <div className='h-16 w-16 '>
                    <input
                      maxLength={1}
                      className='flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-primary focus:bg-gray-50 focus:ring-1'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => setOTPinput([OTPinput[0], e.target.value, OTPinput[2], OTPinput[3]])}
                    ></input>
                  </div>
                  <div className='h-16 w-16 '>
                    <input
                      maxLength={1}
                      className='flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-primary focus:bg-gray-50 focus:ring-1'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => setOTPinput([OTPinput[0], OTPinput[1], e.target.value, OTPinput[3]])}
                    ></input>
                  </div>
                  <div className='h-16 w-16 '>
                    <input
                      maxLength={1}
                      className='flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-primary focus:bg-gray-50 focus:ring-1'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => setOTPinput([OTPinput[0], OTPinput[1], OTPinput[2], e.target.value])}
                    ></input>
                  </div>
                </div>

                <div className='flex flex-col space-y-5'>
                  <div>
                    <a
                      onClick={() => verfiyOTP()}
                      className='flex w-full cursor-pointer flex-row items-center justify-center rounded-xl border border-none bg-primary py-5 text-center text-sm text-white shadow-sm outline-none'
                    >
                      Verify Account
                    </a>
                  </div>

                  <div className='flex flex-row items-center justify-center space-x-1 text-center text-sm font-medium text-gray-500'>
                    <p>Didn't recieve code?</p>{' '}
                    <a
                      className={classNames('flex flex-row items-center', {
                        'cursor-none text-gray-300': disable,
                        'cursor-pointer text-primary underline': !disable
                      })}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : 'Resend OTP'}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className='mb-6 flex flex-col items-center justify-center space-y-2 text-center'>
            <div className='text-[36px] font-semibold text-gray-500'>
              <p>Email Verification</p>
            </div>
            <div className='flex flex-row text-sm font-medium text-gray-400'>
              <p>Enter your email to receive OTP code</p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <form className='w-full' onSubmit={onSubmit}>
              <div className='mb-1.5'>
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
                    disabled={sendMutation.isLoading}
                  />
                </div>
                <p className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.email?.message}</p>
              </div>

              <CustomButton
                title='Send OTP'
                isSubmitButton={true}
                type='filled'
                handleClick={() => {}}
                customStyles='w-full text-white'
                isLoading={sendMutation.isLoading}
                disabled={sendMutation.isLoading}
              />
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default ForgotPassword
