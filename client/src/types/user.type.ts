import { CartItem } from './cart.type'

type Role = 'USER' | 'ADMIN'

export interface User {
  _id: string
  businessName?: string
  fullName: string
  email: string
  // password: string
  address?: {
    country: string
    city: string
    province: string
    addressDetail: string
    zipCode: string
  }
  phoneNumber?: string
  profilePicture?: string
  roles: Role[]
  listStore?: string[]
  cart?: CartItem[]
}

export interface UserModel {
  name: string
  email: string
  aud: string
  azp: string
  email_verified: boolean
  exp: number
  given_name: string
  iat: number
  iss: string
  jti: string
  nbf: number
  picture: string
  sub: string
}
