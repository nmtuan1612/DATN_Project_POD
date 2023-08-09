import React from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs'

type Props = {}

const routes = [{ path: '/', breadcrumb: 'Home' }]

const BreadCrumbs = (props: Props) => {
  const breadcrumbs = useBreadcrumbs(routes)
  console.log(breadcrumbs)

  return (
    <nav className='flex items-center gap-1'>
      {breadcrumbs.map(({ match, breadcrumb }: BreadcrumbData<string>, index) => (
        <>
          <Link
            key={match.pathname}
            to={match.pathname}
            className={`${index === breadcrumbs.length - 1 ? 'text-primary' : 'text-gray-400'}`}
          >
            {breadcrumb}
          </Link>
          <span className={`${index === breadcrumbs.length - 1 ? 'hidden' : 'inline'} text-gray-400`}>/</span>
        </>
      ))}
    </nav>
  )
}

export default BreadCrumbs
