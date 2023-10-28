import React from 'react'
import { Product } from 'src/types/product.type'

type TableProps = Pick<Product, 'sizeGuides'>

const Table = ({ sizeGuides }: TableProps) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      {sizeGuides && (
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Properties
              </th>
              {sizeGuides?.sizes?.map((size) => (
                <th key={size} scope='col' className='px-6 py-3'>
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeGuides.types.map((type) => (
              <tr key={type.name} className='border-b bg-white hover:bg-gray-50'>
                <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                  {type.name}(cm)
                </th>
                {type.ranges.map((range, idx) => (
                  <td key={`${range.from}${idx}`} className='px-6 py-4'>
                    {range.from}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Table
