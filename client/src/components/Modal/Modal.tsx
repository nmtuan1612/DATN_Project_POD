import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import React, { Children } from 'react'
import { fadeAnimation } from 'src/config/motion'
import CustomButton from '../CustomButton/CustomButton'

type Props = {
  visible: boolean
  title?: React.ReactNode | string
  noFooter?: boolean
  isLoading?: boolean
  onOk: any
  canOk?: boolean
  onCancel: () => void
  children: React.ReactNode
}

const Modal = ({ visible, title, onOk, canOk, onCancel, noFooter, isLoading, children }: Props) => {
  return (
    <>
      {visible && (
        <motion.div
          {...fadeAnimation}
          key={'modal'}
          tabIndex={-1}
          className={classNames(
            'fixed left-0 right-0 top-0 z-50 flex h-full max-h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 p-4 md:inset-0'
            // {
            //   hidden: !visible,
            //   flex: visible
            // }
          )}
        >
          <div className='relative max-h-full w-full max-w-md'>
            <div className='relative rounded-lg bg-white shadow'>
              <button
                type='button'
                onClick={onCancel}
                disabled={isLoading}
                className='absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
              >
                <svg
                  className='h-3 w-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>

              {/* Title */}
              {title && <h2 className='border-b px-3 py-[14px] text-xl font-medium'>{title}</h2>}

              {/* Content */}
              <div className='p-6'>{children}</div>

              {/* Footer */}
              {!noFooter && (
                <div className='flex items-center justify-end gap-2 border-t px-6 py-3'>
                  <CustomButton
                    type='filled'
                    title="Yes, I'm sure"
                    handleClick={onOk}
                    disabled={isLoading || !canOk}
                    // className='mr-2 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-0'
                  />
                  <CustomButton
                    type='outline'
                    title='No, cancel'
                    handleClick={onCancel}
                    disabled={isLoading}
                    // className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-0'
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Modal
