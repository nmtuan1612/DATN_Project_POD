import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { fadeAnimation } from 'src/config/motion'
import path from 'src/config/path'

type Props = {
  children?: React.ReactNode
}

const ResetPasswordLayout = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <div className='app bg-[#f8f6fa] bg-contain bg-no-repeat'>
        <div className='container flex h-screen flex-col md:gap-[16vh]'>
          <div className='py-4'>
            <Link to='/' className='logo'>
              <span className='text-primary'>Creo</span>
              <span className='text-gray-400'>Print</span>
            </Link>
          </div>

          <div className='flex justify-center'>
            <motion.div {...fadeAnimation} className='w-full md:max-w-xl'>
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default ResetPasswordLayout
