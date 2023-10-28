import React, { ReactNode } from 'react'
import { primaryColor } from 'src/config/constants'
import { TabType } from 'src/types/config.type'

type TabProps = {
  tab: TabType
  isFilterTab?: boolean
  isActiveTab?: boolean
  classStyle?: string
  handleClick: () => void
}

const Tab = ({ tab, isFilterTab, isActiveTab, classStyle, handleClick }: TabProps) => {
  const activeStyles =
    // isFilterTab && isActiveTab
    isActiveTab ? { backgroundColor: 'rgba(55, 65, 81, 0.05)', color: primaryColor, opacity: 1 } : { opacity: 1 }
  // : { backgroundColor: 'transparent', opacity: 1 }
  return (
    <div
      key={tab.name}
      className={`tab-btn flex cursor-pointer select-none items-center justify-center gap-1 py-[10px] text-gray-700 hover:bg-gray-100 ${
        isFilterTab ? 'glassmorphism flex-row rounded-lg px-3 shadow-lg' : 'flex-col'
      } ${classStyle}`}
      onClick={handleClick}
      style={activeStyles}
    >
      {isFilterTab && isActiveTab ? (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-8 w-8'>
          <path
            fillRule='evenodd'
            d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
            clipRule='evenodd'
          />
        </svg>
      ) : (
        <img
          src={tab.icon}
          alt={tab.name}
          // className={`${isFilterTab ? 'h-2/3 w-2/3' : 'h-11/12 w-11/12 object-contain'}`}
          className={'h-8 w-8 object-contain'}
        />
      )}
      <span className='text-xs font-[600]'>{tab.tag}</span>
    </div>
  )
}

export default Tab
