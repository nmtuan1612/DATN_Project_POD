import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { AppUrls } from 'src/config/config'
import { Categories } from 'src/config/constants'
import { slideAnimation } from 'src/config/motion'

type Props = {}

const CategoryList = (props: Props) => {
  return (
    // <div className='flex flex-col gap-2'>
    // <h2 className='text-center font-semibold text-gray-700'>CategoryList</h2>
    <AnimatePresence>
      <motion.section {...slideAnimation('right')} className='grid-col-1 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {Categories.map((category) => (
          <motion.div className='col-span-1' key={category.name}>
            <Link
              to={AppUrls.categoryProduct(category.id)}
              className='group relative block h-[120px] overflow-hidden rounded-lg bg-[#f7f7f7] p-6 pr-[168px] shadow-md transition-all duration-500 hover:shadow-around md:h-[140px] md:pr-[124px] xl:h-[160px] xl:pr-[168px]'
            >
              <h3 className='font-bold text-gray-900 transition-all duration-300 group-hover:text-primary'>
                {category.name}
              </h3>
              {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
                <path
                  fillRule='evenodd'
                  d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z'
                  clipRule='evenodd'
                />
              </svg> */}

              <img
                className='absolute right-2 top-0 h-full w-auto md:right-0 xl:right-2'
                src={category.thumbnail ?? 'https://images.printify.com/api/catalog/5f61f709105ab9030c4be5a8.png?s=168'}
                alt={category.name}
              />
            </Link>
          </motion.div>
        ))}
      </motion.section>
    </AnimatePresence>
    // </div>
  )
}

export default CategoryList
