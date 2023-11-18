import classNames from 'classnames'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import Tooltip from 'src/components/Tooltip/Tooltip'
import { Product, ProductVariant } from 'src/types/product.type'

type PricingTableProps = {
  variants: ProductVariant[]
  selected: string[]
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[] | undefined>>
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

type EditField = {
  variantId: string
  name: 'retailPrice' | 'profit' | 'profitMargin'
  value: number
}

const PricingTable = ({ selected, setSelected, variants, setVariants }: PricingTableProps) => {
  const [editField, setEditField] = useState<EditField | null>(null)

  const isSelectedAll = isEqual(
    selected,
    variants.map((variant) => variant._id)
  )

  // console.log(editField)
  // console.log(variants)

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(variants.map((variant) => variant._id))
    } else setSelected([])
  }

  const handleSelectProduct = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const onFieldChange = (e: any) => {
    if (editField) {
      const fieldValue = Number(e.target.value) || 0

      setEditField({ ...editField, value: editField.name === 'profitMargin' ? e.target.value : fieldValue })
      setVariants(
        (prev) =>
          prev?.map((variant: ProductVariant) => {
            if (editField?.variantId === variant._id) {
              switch (editField.name) {
                case 'profit':
                  return {
                    ...variant,
                    profit: Number(fieldValue.toFixed(2)),
                    retailPrice: Number((variant.productionCost + fieldValue).toFixed(2)),
                    profitMargin: Number((fieldValue / variant.productionCost).toFixed(2))
                  }
                case 'retailPrice':
                  return {
                    ...variant,
                    retailPrice: Number(fieldValue.toFixed(2)),
                    profit: Number((fieldValue - variant.productionCost).toFixed(2)),
                    profitMargin: Number((fieldValue / variant.productionCost - 1).toFixed(2))
                  }
                case 'profitMargin':
                  return {
                    ...variant,
                    profitMargin: Number((fieldValue / 100).toFixed(2)) || 0,
                    profit: Number((variant.productionCost * (fieldValue / 100)).toFixed(2)),
                    retailPrice: Number((variant.productionCost * ((fieldValue + 100) / 100)).toFixed(2))
                  }
              }
            }
            return variant
          })
      )
    }
  }

  const onBlurEditField = () => {
    // setVariants(
    //   (prev) =>
    //     prev?.map((variant: ProductVariant) => {
    //       if (editField?.variantId === variant._id) {
    //         variant[editField.name] = editField.value
    //         // return { ...variant, }
    //       }
    //       return variant
    //     })
    // )
    setEditField(null)
  }

  return (
    <div className=''>
      {variants && (
        <>
          {/* Header */}
          {/* <div className='mt-6 grid grid-cols-12 rounded-lg px-6 py-4'>
            <div className='col-span-5 flex items-center'>
              <input
                id='term-checkbox'
                type='checkbox'
                disabled={!sizeGuides.sizes?.length}
                checked={isSelectedAll}
                onChange={handleSelectAll}
                className='h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0 disabled:cursor-not-allowed'
              />
              <label htmlFor='term-checkbox' className='ml-2 text-base font-medium text-gray-500'>
                Select all
              </label>
            </div>
          </div> */}

          {/* Table */}
          <div className='overflow-x-auto pt-4'>
            <div className='relative border-l border-r shadow-md sm:rounded-lg'>
              <table className='w-full text-left text-sm text-gray-600'>
                <thead className='bg-gray-100 text-sm capitalize text-gray-700'>
                  <tr>
                    <th scope='col' className='p-4'>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          checked={isSelectedAll}
                          onChange={handleSelectAll}
                          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0'
                        />
                      </div>
                    </th>
                    <th scope='col' className='border-r-2 py-3 pl-2 pr-6'>
                      Size
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Inventory
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <div className='flex w-max items-center gap-1'>
                        Retail price
                        <Tooltip content='Default retail price based on maximum production cost and profit margin.'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='h-5 w-5'
                          >
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <div className='flex w-max items-center gap-1'>
                        Profit
                        <Tooltip content='Default profit calculated with production cost and retail price only.'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='h-5 w-5'
                          >
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <div className='w-max'>Profit margin</div>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <div className='flex w-max items-center gap-1'>
                        Production cost
                        <Tooltip content='Depends on price set by provider closest.'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='h-5 w-5'
                          >
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <div className='w-max'>Shipping cost</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant._id} className='border-b bg-white hover:bg-gray-50'>
                      <td className='w-4 p-4'>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            checked={selected.includes(variant._id)}
                            onChange={() => handleSelectProduct(variant._id)}
                            className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-0'
                          />
                        </div>
                      </td>
                      <td className='h-[52px] border-r-2 pl-2 pr-6'>{variant.size}</td>
                      <td className='h-[52px] px-6'>
                        <div className='w-max'>{variant.inventory}</div>
                      </td>
                      <td className='group h-[52px] px-6 md:min-w-[148px]'>
                        <div
                          className={classNames('w-max group-hover:hidden', {
                            hidden: editField?.name === 'retailPrice' && editField?.variantId === variant._id
                          })}
                        >
                          USD {variant.retailPrice}
                        </div>
                        <div
                          className={classNames('group-hover:flex', {
                            flex: editField?.name === 'retailPrice' && editField?.variantId === variant._id,
                            hidden: editField?.name !== 'retailPrice' || editField?.variantId !== variant._id
                          })}
                        >
                          <span className='rounded-e-0 inline-flex items-center rounded-s-md border border-gray-300 bg-gray-200 px-1 text-xs text-gray-900'>
                            USD
                          </span>
                          <input
                            type='number'
                            value={
                              editField?.name === 'retailPrice' && editField?.variantId === variant._id
                                ? editField?.value
                                : variant.retailPrice
                            }
                            placeholder={variant.retailPrice.toString()}
                            onFocus={() =>
                              setEditField({ variantId: variant._id, name: 'retailPrice', value: variant.retailPrice })
                            }
                            onChange={onFieldChange}
                            onBlur={onBlurEditField}
                            className='focus:ring-priborder-primary block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-primary focus:ring-0'
                          />
                        </div>
                      </td>
                      <td className='group h-[52px] px-6 md:min-w-[148px]'>
                        <div
                          className={classNames('w-max group-hover:hidden', {
                            hidden: editField?.name === 'profit' && editField?.variantId === variant._id
                          })}
                        >
                          USD {variant.profit}
                        </div>
                        <div
                          className={classNames('group-hover:flex', {
                            flex: editField?.name === 'profit' && editField?.variantId === variant._id,
                            hidden: editField?.name !== 'profit' || editField?.variantId !== variant._id
                          })}
                        >
                          <span className='rounded-e-0 inline-flex items-center rounded-s-md border border-gray-300 bg-gray-200 px-1 text-xs text-gray-900'>
                            USD
                          </span>
                          <input
                            type='number'
                            value={
                              editField?.name === 'profit' && editField?.variantId === variant._id
                                ? editField?.value
                                : variant.profit
                            }
                            placeholder={variant.profit.toString()}
                            onFocus={() =>
                              setEditField({ variantId: variant._id, name: 'profit', value: variant.profit })
                            }
                            onChange={onFieldChange}
                            onBlur={onBlurEditField}
                            className='focus:ring-priborder-primary block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-primary focus:ring-0'
                          />
                        </div>
                      </td>
                      <td className='group h-[52px] px-6 md:min-w-[148px]'>
                        <div
                          className={classNames('w-max group-hover:hidden', {
                            hidden: editField?.name === 'profitMargin' && editField?.variantId === variant._id
                          })}
                        >
                          {Number(variant.profitMargin) * 100} %
                        </div>
                        <div
                          className={classNames('group-hover:flex', {
                            flex: editField?.name === 'profitMargin' && editField?.variantId === variant._id,
                            hidden: editField?.name !== 'profitMargin' || editField?.variantId !== variant._id
                          })}
                          onClick={() =>
                            setEditField({
                              variantId: variant._id,
                              name: 'profitMargin',
                              value: Number(variant.profitMargin) * 100
                            })
                          }
                        >
                          <span className='rounded-e-0 inline-flex items-center rounded-s-md border border-gray-300 bg-gray-200 px-2 text-xs text-gray-900'>
                            %
                          </span>
                          <input
                            type='text'
                            value={
                              editField?.name === 'profitMargin' && editField?.variantId === variant._id
                                ? editField?.value?.toString()
                                : String(Number(variant.profitMargin) * 100)
                            }
                            placeholder={(Number(variant.profitMargin) * 100).toString()}
                            onChange={onFieldChange}
                            onFocus={() =>
                              setEditField({
                                variantId: variant._id,
                                name: 'profitMargin',
                                value: Number(variant.profitMargin) * 100
                              })
                            }
                            onBlur={onBlurEditField}
                            className='focus:ring-priborder-primary block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-primary focus:ring-0'
                          />
                        </div>
                      </td>
                      <td className='h-[52px] px-6'>
                        <div className='w-max'>USD {variant.productionCost}</div>
                      </td>
                      <td className='h-[52px] px-6'>
                        <div className='w-max'>USD {variant.shippingCost}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PricingTable
