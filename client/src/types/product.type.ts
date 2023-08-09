export interface Product {
  _id: string
  ownerId: string
  category: {
    _id: string
    name: string
  }[]
  name: string
  details: string[]
  description: string
  price: number
  image: string
  otherImages?: string[]
  type: string
  hiddenTag: string
  isPublished: boolean
  rating?: number
  sold: number
  createdAt: string
  updatedAt: string

  variants?: string[] // list variant ids
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}
