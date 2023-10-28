import React from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs'

type Props = {}

const routes = [{ path: '/', breadcrumb: 'Home' }]

const BreadCrumbs = (props: Props) => {
  const breadcrumbs = useBreadcrumbs(routes)
  // console.log(breadcrumbs)

  return (
    <nav className='flex items-center gap-1'>
      {breadcrumbs &&
        breadcrumbs.map(({ match, breadcrumb }: BreadcrumbData<string>, index) => (
          <Link
            key={match.pathname + index}
            to={match.pathname}
            className={`${index === breadcrumbs.length - 1 ? 'text-primary' : 'text-gray-400'}`}
          >
            {breadcrumb}
            <span className={`${index === breadcrumbs.length - 1 ? 'hidden' : 'inline'} ml-1 text-gray-400`}>/</span>
          </Link>
        ))}
    </nav>
  )
}

export default BreadCrumbs
