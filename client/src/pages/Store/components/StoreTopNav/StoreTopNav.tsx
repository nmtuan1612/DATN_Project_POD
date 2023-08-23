import React, { useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CustomButton } from 'src/components'
import config, { AppUrls } from 'src/config/config'
import { AppContext } from 'src/context/app.context'

type Props = {}

const StoreTopNav = (props: Props) => {
  const { currentStore } = useContext(AppContext)
  const { pathname } = useLocation()

  const tabTitle = useMemo(() => {
    if (pathname) {
      let title = pathname.split('/').pop()
      const words = title?.split('-').map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase()
      })
      return words?.join(' ')
    }
  }, [pathname])

  return (
    <div className='flex items-center justify-between'>
      <h2 className='tab__title'>{tabTitle}</h2>
      <CustomButton
        type='filled'
        title={
          <>
            View Store
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
          </>
        }
        handleClick={() => {
          const link = document.createElement('a')
          link.setAttribute(
            'href',
            `${config.development.frontendUrl}${AppUrls.shopDetail(currentStore?._id as string)}`
          )
          link.setAttribute('target', '_blank')
          link.click()
        }}
      />
    </div>
  )
}

export default StoreTopNav
