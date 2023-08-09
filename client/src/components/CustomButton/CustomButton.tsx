import React, { ReactNode } from 'react'
import { useSnapshot } from 'valtio'

import state from '../../store'
import { getContrastingColor } from '../../config/helpers'
import { primaryColor } from '../../config/constants'

type ButtonType = 'filled' | 'outline'

type Props = {
  type: ButtonType
  title: string | ReactNode
  customStyles?: string
  handleClick?: () => any
}

const CustomButton = ({ type, title, customStyles, handleClick }: Props) => {
  const snap = useSnapshot(state)

  const generateStyle = (type: ButtonType) => {
    if (type === 'filled') {
      return {
        // backgroundColor: snap.color,
        // color: getContrastingColor(snap.color)
        backgroundColor: primaryColor,
        color: '#fff',
        // borderWidth: '1px',
        borderColor: primaryColor
      }
    } else if (type === 'outline') {
      return {
        // borderWidth: '1px',
        borderColor: '#c5c7c8'
        // borderColor: snap.color,
        // color: snap.color
      }
    }
  }

  return (
    <button
      className={`rounded-lg border-[1px] px-4 py-2 text-sm font-medium hover:opacity-80 focus:outline-none md:px-5 md:py-2.5 ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton
