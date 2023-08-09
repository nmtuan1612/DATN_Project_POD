import React from 'react'

type Props = {}

const Table = (props: Props) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-left text-sm text-gray-500'>
        <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Properties
            </th>
            <th scope='col' className='px-6 py-3'>
              S
            </th>
            <th scope='col' className='px-6 py-3'>
              M
            </th>
            <th scope='col' className='px-6 py-3'>
              L
            </th>
            <th scope='col' className='px-6 py-3'>
              XL
            </th>
            <th scope='col' className='px-6 py-3'>
              2XL
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b bg-white hover:bg-gray-50'>
            <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
              Width(cm)
            </th>
            <td className='px-6 py-4'>51.00</td>
            <td className='px-6 py-4'>56.00</td>
            <td className='px-6 py-4'>61.00</td>
            <td className='px-6 py-4'>66.00</td>
            <td className='px-6 py-4'>71.00</td>
          </tr>
          <tr className='border-b bg-white hover:bg-gray-50'>
            <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
              Length(cm)
            </th>
            <td className='px-6 py-4'>69.00</td>
            <td className='px-6 py-4'>71.00</td>
            <td className='px-6 py-4'>74.00</td>
            <td className='px-6 py-4'>76.00</td>
            <td className='px-6 py-4'>79.00</td>
          </tr>
          <tr className='bg-white hover:bg-gray-50'>
            <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
              Sleeve length(cm)
            </th>
            <td className='px-6 py-4'>85.10</td>
            <td className='px-6 py-4'>87.63</td>
            <td className='px-6 py-4'>90.17</td>
            <td className='px-6 py-4'>92.71</td>
            <td className='px-6 py-4'>95.25</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
