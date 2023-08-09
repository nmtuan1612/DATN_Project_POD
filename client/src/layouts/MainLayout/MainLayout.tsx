import React from 'react'
import Header from '../../components/Header/Header'
import CanvasModel from 'src/canvas'

type Props = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className='app transition-all ease-in'>
      {/* <div className='sticky top-0 z-50'> */}
      <Header />
      {/* </div> */}
      <div className='h-full pt-20'>{children}</div>
      {/* <CanvasModel /> */}
    </div>
  )
}

export default MainLayout
