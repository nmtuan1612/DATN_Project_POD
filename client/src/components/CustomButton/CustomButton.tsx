import React, { ReactNode } from 'react'
import { useSnapshot } from 'valtio'

import state from '../../store'
import { getContrastingColor } from '../../config/helpers'
import { primaryColor } from '../../config/constants'
import classNames from 'classnames'

type ButtonType = 'filled' | 'outline' | 'danger' | 'icon'
export type ButtonSize = 'small' | 'medium' | 'large'

type Props = {
  type: ButtonType
  size?: ButtonSize
  title: string | ReactNode
  disabled?: boolean
  customStyles?: string
  isLoading?: boolean
  isSubmitButton?: boolean
  handleClick?: () => any
}

const CustomButton = ({
  type,
  size = 'medium',
  title,
  disabled,
  customStyles,
  isLoading,
  isSubmitButton,
  handleClick
}: Props) => {
  const snap = useSnapshot(state)

  const generateStyle = (type: ButtonType) => {
    if (type === 'filled') {
      return {
        // color: getContrastingColor(snap.color)
        backgroundColor: primaryColor,
        color: '#fff',
        borderColor: primaryColor
      }
    } else if (type === 'outline') {
      return {
        borderColor: '#c5c7c8'
        // backgroundColor: '#f3f4f6'
      }
    } else if (type === 'danger') {
      return {
        color: '#fff',
        borderColor: '#ff4d4f',
        backgroundColor: '#ff4d4f'
      }
    } else if (type === 'icon') {
      return {
        border: 'none'
      }
    }
  }

  return (
    <button
      className={classNames(
        `flex items-center justify-center gap-1 rounded-lg border-[1px] font-medium hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${customStyles}`,
        {
          'px-2 py-1 text-sm md:px-2 md:py-1': size === 'small',
          'px-4 py-2 text-sm md:px-5 md:py-2.5': size === 'medium',
          'px-6 py-3 text-base md:px-6 md:py-3': size === 'large'
        }
      )}
      style={generateStyle(type)}
      disabled={disabled}
      onClick={handleClick}
      type={isSubmitButton ? 'submit' : 'button'}
    >
      {isLoading && (
        <svg
          aria-hidden='true'
          className='mr-2 h-4 w-4 animate-spin fill-white text-gray-200'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
      )}
      {title}
    </button>
  )
}

export default CustomButton
