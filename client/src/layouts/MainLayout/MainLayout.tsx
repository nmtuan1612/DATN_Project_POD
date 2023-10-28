import React from 'react'
import UserChats from 'src/pages/User/pages/UserChats/UserChats'
import Header from '../../components/Header/Header'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'
import InputSearch from 'src/components/InputSearch/InputSearch'
import useQueryConfig from 'src/hooks/useQueryConfig'
import Footer from 'src/components/Footer/Footer'
import path from 'src/config/path'

type Props = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  const { pathname } = useLocation()
  const queryConfig = useQueryConfig()

  return (
    <div className='app relative transition-all ease-in'>
      {/* <div className='sticky top-0 z-50'> */}
      <Header />
      {/* </div> */}
      <div className='h-full pt-20'>
        {!pathname.includes('/shop/') && !pathname.includes('/user/') && (
          <div className='my-t container md:mt-6'>
            <InputSearch
              placeholder='Search sample product...'
              pathname={path.productSearchResult}
              queryConfig={queryConfig}
            />
          </div>
        )}
        {children}
        {/* <Footer /> */}
      </div>
      {/* <CanvasModel /> */}
      {!pathname.includes('/shop/') && <UserChats />}
    </div>
  )
}

export default MainLayout
