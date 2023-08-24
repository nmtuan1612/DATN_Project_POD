import React from 'react'
import { Link } from 'react-router-dom'
import './AuthLayout.style.scss'
import path from 'src/config/path'
import { AnimatePresence, motion } from 'framer-motion'
import { slideAnimation } from 'src/config/motion'

type Props = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <div className='app auth__layout'>
        <div className='container flex h-screen flex-col md:gap-[16vh]'>
          <div className='py-4'>
            <Link to='/' className='logo'>
              <span className='text-primary'>Creo</span>
              <span className='text-gray-400'>Print</span>
            </Link>
          </div>

          <div className='grid w-full grid-cols-1 md:grid-cols-12 md:gap-[60px]'>
            <motion.div {...slideAnimation('left')} className='col-span-1 md:col-span-5'>
              {children}
            </motion.div>
            <motion.div {...slideAnimation('right')} className='col-span-1 md:col-span-6 md:col-start-7 md:py-10'>
              <h2 className='text-[40px] font-[600] text-gray-700'>Welcome to CreoPrint</h2>
              <ul className='list-disc pl-8'>
                <li className='text-gray-500'>Online Design </li>
                <li className='text-gray-500'>Variety 3D Mockups </li>
                <li className='text-gray-500'>Artificial Intelligent Integrated</li>
              </ul>
              <Link
                to={path.home}
                className='mt-8 flex w-fit items-center gap-3 rounded-lg px-3 py-1 font-medium text-primary hover:bg-primary hover:text-white focus:outline-none md:px-3 md:py-1.5'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
                </svg>
                Back to Home page
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default AuthLayout
