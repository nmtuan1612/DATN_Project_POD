import React, { ReactNode } from 'react'
import { primaryColor } from 'src/config/constants'

type TabProps = {
  tab: Tab
  isFilterTab?: boolean
  isActiveTab?: boolean
  handleClick: () => void
}

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }: TabProps) => {
  const activeStyles =
    // isFilterTab && isActiveTab
    isActiveTab
      ? { backgroundColor: 'rgba(55, 65, 81, 0.05)', color: primaryColor, opacity: 1 }
      : { backgroundColor: 'transparent', opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn flex cursor-pointer select-none flex-col items-center justify-center gap-1 py-[10px] text-gray-700 hover:bg-gray-100 ${
        isFilterTab ? 'glassmorphism rounded-full' : 'rounded-4'
      }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        // className={`${isFilterTab ? 'h-2/3 w-2/3' : 'h-11/12 w-11/12 object-contain'}`}
        className={'h-8 w-8 object-contain'}
      />
      <span className='text-xs font-[600]'>{tab.tag}</span>
    </div>
  )
}

export default Tab
