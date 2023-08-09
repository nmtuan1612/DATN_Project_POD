import React from 'react'
import { Link } from 'react-router-dom'
import './AuthLayout.style.scss'

type Props = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className='app auth__layout'>
      <div className='container flex h-screen flex-col md:gap-[16vh]'>
        <div className='py-4'>
          <Link to='/' className='logo'>
            <span className='text-primary'>Creo</span>
            <span className='text-gray-400'>Print</span>
          </Link>
        </div>

        <div className='grid w-full grid-cols-1 md:grid-cols-12 md:gap-[60px]'>
          <div className='col-span-1 md:col-span-5'>{children}</div>
          <div className='col-span-1 md:col-span-6 md:col-start-7 md:py-10'>
            <h2 className='text-[40px] font-[600] text-gray-700'>Welcome to CreoPrint</h2>
            <ul className='list-disc pl-8'>
              <li className='text-gray-500'>Online Design </li>
              <li className='text-gray-500'>Variety 3D Mockups </li>
              <li className='text-gray-500'>Artificial Intelligent Integrated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
