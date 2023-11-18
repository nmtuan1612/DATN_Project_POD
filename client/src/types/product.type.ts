import { PrintOptions } from './config.type'

export type PrintArea = 'front' | 'back' | 'full' | string

type modelMetaData = {
  _id: string
  modelUrl: string
  groupScale?: number
  rotation?: [number, number, number]
  logoPosition?: [number, number, number]
  logoScale?: number
  fullTexturePosition?: [number, number, number]
  textureScale?: number
  meshes?: {
    name: string
    isMainMesh: boolean
  }[]
}

export interface ProductVariant {
  _id: string
  productId: string
  sku: string
  size: string
  inventory: string
  retailPrice: number
  profit: number
  profitMargin: number
  productionCost: number
  shippingCost: number
  isPublished: boolean
}
export interface Product {
  _id: string
  storeId: string | any
  modelMetaData: modelMetaData
  categoryIds: string[]
  name: string
  details: string[]
  description: string
  printBrand: string
  price: number
  modelId?: string
  customMetadata?: {
    color: string
    rotation?: [number, number, number]
    logo: string
    fullTexture: string
    logoPrintOptions: PrintOptions
    fullTexturePrintOptions: PrintOptions
  }
  printAreas?: PrintArea[]
  image: string
  otherImages?: string[]
  typeId?: string
  type: { id: string; name: string }
  hiddenTag: string
  status: 'published' | 'unpublished'
  rating?: number
  sold: number
  sizeGuides: {
    sizes: string[]
    types: { name: string; ranges: { from: string; to: string }[]; units: string }[]
  }
  createdAt: string
  updatedAt: string

  variants?: ProductVariant[] // list variant ids
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface SampleProduct {
  _id: string
  categoryIds: string[]
  name: string
  details: string[]
  description: string
  printBrand: string
  price: number
  modelId: string
  image: string
  otherImages?: string[]
  typeId: string
  hiddenTag: string
  sizeGuides: {
    sizes: string[]
    types: { name: string; ranges: { from: string; to: string }[]; units: string }[]
  }

  createdAt: string
  updatedAt: string

  variants?: string[] // list variant ids
}
export interface SampleProductDetail extends SampleProduct {
  type: {
    _id: string
    name: string
    categoryIds: string[]
  }
  modelMetaData: modelMetaData
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  typeIds?: string
  categoryId?: string
  sizes?: string
  shipFrom?: string
  hiddenTag?: string
  status?: string
  printBrandIds?: string
  sortBy?: 'popularity' | 'lowest_price' | 'highest_price'
  productIds?: string
  searchKey?: string
  // order?: 'asc' | 'desc'
  // exclude?: string
  // rating_filter?: number | string
  // price_max?: number | string
  // price_min?: number | string
  // name?: string
}

export interface ProductCartItem {
  _id: string
  quantity: number
}

export interface CartProductResponse extends Omit<ProductVariant, 'productId'> {
  productId: {
    _id: string
    name: string
    image: string
    description: string
  }
}
