import React, { useContext } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import { UserOptions } from 'src/config/constants'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { clearLS } from 'src/utils/auth'
import UserImg from 'src/assets/user.svg'

type Props = {}

const UserDropdown = (props: Props) => {
  const { profile, setIsAuthenticated, setProfile } = useContext(AppContext)

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
  }

  return (
    <Dropdown
      classStyleChildren='mr-3 p-[0px] flex rounded-full bg-gray-200 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0'
      classStyleOptions='my-2 min-w-max list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-around'
      options={() => (
        <>
          <div className='px-4 py-3'>
            <span className='block text-sm text-gray-900'>{profile?.fullName}</span>
            <span className='block truncate  text-sm text-gray-500'>{profile?.email}</span>
          </div>
          <ul className='py-2' aria-labelledby='user-menu-button'>
            {UserOptions.map((option) => (
              <li key={option.name}>
                <Link to={option.url} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                  {option.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='py-1'>
            <Link
              to='/login'
              onClick={handleSignOut}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              Sign out
            </Link>
          </div>
        </>
      )}
    >
      <span className='sr-only'>Open user menu</span>
      {profile?.profilePicture ? (
        <img className='h-8 w-8 rounded-full' src={profile?.profilePicture} alt='user photo' />
      ) : (
        <div className='h-8 w-8 rounded-full p-1.5'>
          <img src={UserImg} alt='user photo' />
        </div>
      )}
    </Dropdown>
  )
}

export default UserDropdown
