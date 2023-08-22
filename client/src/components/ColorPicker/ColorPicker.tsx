import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)

  return (
    <div className='colorPicker-container'>
      <h2 className='pl-[10px] text-base font-semibold text-gray-600'>Pick color</h2>
      <SketchPicker color={snap.color} disableAlpha onChange={(color) => (state.color = color.hex)} />
    </div>
  )
}

export default ColorPicker
