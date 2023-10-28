import React from 'react'

type Props = {
  children: React.ReactNode
}

const UserCartWrapper = ({ children }: Props) => {
  return <div className='container pt-10'>{children}</div>
}

export default UserCartWrapper
