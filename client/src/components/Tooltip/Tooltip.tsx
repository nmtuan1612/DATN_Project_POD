import React from 'react'

type Props = {
  children: string | React.ReactNode
  content: string | React.ReactNode
  classStyle?: string
}

const Tooltip = ({ children, content, classStyle }: Props) => {
  return (
    <div className={`group relative ${classStyle}`}>
      {children}
      <div
        role='tooltip'
        className='absolute bottom-full left-[50%] z-50 mb-2 hidden min-w-max max-w-[200px] translate-x-[-50%] rounded-lg bg-gray-600 px-3 py-2 text-xs text-white shadow-sm after:absolute after:left-[50%] after:top-full after:h-0 after:w-0 after:translate-x-[-50%] after:border-l-[6px] after:border-r-[6px] after:border-t-[6px] after:border-l-transparent after:border-r-transparent after:border-t-gray-600 after:content-[""] group-hover:inline-block'
      >
        {content}
      </div>
    </div>
  )
}

export default Tooltip
