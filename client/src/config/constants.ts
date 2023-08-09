import { swatch, fileIcon, ai, logoShirt, stylishShirt, men, women, homeAndLiving, accessories } from '../assets'
import path from './path'

export const primaryColor = '#955de6'

export const NavbarLinks = [
  {
    title: 'My products',
    url: path.shopManageProduct
  },
  {
    title: 'Orders',
    url: path.userOrders
  },
  {
    title: 'Help & Support',
    url: path.helpAndSupport
  }
] as const

export const UserOptions = [
  {
    name: 'Dashboard',
    url: path.home
  },
  {
    name: 'My account',
    url: path.userDetail
  },
  {
    name: 'Manage stores',
    url: path.userStores
  },
  {
    name: 'Settings',
    url: path.userSetting
  }
] as const

export const Categories = [
  {
    name: "Men's Clothes",
    id: 'men-clothes',
    thumbnail: men
  },
  {
    name: "Women's Clothes",
    id: 'women-clothes',
    thumbnail: women
  },
  {
    name: 'Home & Living',
    id: 'home-and-living',
    thumbnail: homeAndLiving
  },
  {
    name: 'Accessories',
    id: 'accessories',
    thumbnail: accessories
  }
]

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: swatch
  },
  {
    name: 'filepicker',
    icon: fileIcon
  },
  {
    name: 'aipicker',
    icon: ai
  }
] as const

export const FilterTabs = [
  {
    name: 'logoTab',
    icon: logoShirt
  },
  {
    name: 'stylishTab',
    icon: stylishShirt
  }
] as const

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoTab'
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishTab'
  }
} as const
