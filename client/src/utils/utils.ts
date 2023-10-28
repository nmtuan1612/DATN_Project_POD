import axios, { AxiosError } from 'axios'
import config from 'src/config/config'
// import config from 'src/constants/config'
// import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import userImage from 'src/assets/user.svg'
import storeImage from 'src/assets/store.svg'
import { Product, ProductVariant } from 'src/types/product.type'
import { FULL__TEXTURE__FEE, LOGO__FEE, PROFIT__MARGIN, SHIPPING__FEE, UP__SIZE__FEE } from 'src/config/constants'
// import { ErrorResponse } from 'src/types/utils.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

// export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
//   return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
// }

// export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
//   return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
// }

// export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
//   return (
//     isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
//     error.response?.data?.data?.name === 'EXPIRED_TOKEN'
//   )
// }

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) =>
  avatarName ? `${config.development.backendUrl}images/${avatarName}` : userImage
export const getLogoUrl = (avatarName?: string) =>
  avatarName ? `${config.development.backendUrl}images/${avatarName}` : storeImage

export const generateProductVariants = (
  params: Pick<Product, '_id' | 'sizeGuides' | 'price' | 'printAreas'>
): Omit<ProductVariant, '_id'>[] => {
  const {
    _id,
    sizeGuides: { sizes },
    price,
    printAreas
  } = params
  const variants = sizes.map((size, index) => {
    let productionCost = price + index * UP__SIZE__FEE
    // console.log(printAreas)
    printAreas?.includes('logo') && (productionCost += LOGO__FEE)
    printAreas?.includes('full') && (productionCost += FULL__TEXTURE__FEE)

    const profit = Number((productionCost * PROFIT__MARGIN).toFixed(2))
    const retailPrice = Number((productionCost + profit).toFixed(2))

    return {
      productId: _id,
      sku: `${_id}-${size}`,
      size: size,
      inventory: 'All in stock',
      retailPrice,
      profit,
      profitMargin: PROFIT__MARGIN,
      productionCost: Number(productionCost.toFixed(2)),
      shippingCost: SHIPPING__FEE,
      isPublished: false
    }
  })

  return variants
}
