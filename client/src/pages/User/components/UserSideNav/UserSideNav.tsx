import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { UserOptions } from 'src/config/constants'
import { AppContext } from 'src/context/app.context'
import UserImg from 'src/assets/user.svg'
import './UserSideNav.style.scss'

type Props = {}

const UserSideNav = (props: Props) => {
  const { profile } = useContext(AppContext)
  const { pathname } = useLocation()

  return (
    <div className='flex flex-col gap-2 pr-8'>
      {/* UserSideNav */}
      <div className='flex items-center'>
        {profile?.profilePicture ? (
          <img className='h-10 w-10 rounded-full' src={profile?.profilePicture} alt='user photo' />
        ) : (
          <div className='h-10 w-10 rounded-full bg-gray-200 p-1.5 ring-2 ring-gray-300'>
            <img src={UserImg} alt='user photo' />
          </div>
        )}
        <div className='px-4'>
          <span className='block font-medium text-gray-900'>{profile?.fullName}</span>
          <span className='block truncate  text-sm text-gray-600'>{profile?.email}</span>
        </div>
      </div>
      {/* Tabs */}
      <ul className='mt-3' aria-labelledby='user-menu-button'>
        {UserOptions.map((option) => {
          const isActive = option.url === pathname

          return (
            <li key={option.name}>
              <Link
                to={option.url}
                className={classNames(
                  'text mt-3 flex items-center gap-2 rounded-lg p-3 text-gray-700 hover:bg-gray-100',
                  {
                    'bg-gray-100': isActive,
                    'bg-white': !isActive
                  }
                )}
              >
                <span dangerouslySetInnerHTML={{ __html: option.icon }} className='side__nav-icon' />
                {option.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserSideNav
