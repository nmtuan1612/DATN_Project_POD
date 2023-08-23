import { swatch, fileIcon, ai, logoShirt, stylishShirt, men, women, homeAndLiving, accessories } from '../assets'
import { AppUrls } from './config'
import path from './path'

export const primaryColor = '#955de6'

// NavLinks
export const NavbarLinks = [
  // {
  //   title: 'My products',
  //   url: path.shopManageProduct
  // },
  // {
  //   title: 'Orders',
  //   url: path.userOrders
  // },
  {
    title: 'Term',
    url: path.term
  },
  {
    title: 'Support Center',
    url: path.supportCenter
  }
] as const

// UserOptions
export const UserOptions = [
  {
    name: 'Account Details',
    url: path.userDetail,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>`
  },

  // {
  //   name: 'My account',
  //   url: path.userDetail
  // },
  {
    name: 'Manage stores',
    url: path.userStores,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>`
  },
  {
    name: 'Settings',
    url: path.userSetting,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`
  }
] as const

// Store options
export const StoreOptions = [
  {
    name: 'My Products',
    url: AppUrls.shopManageProducts,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z" />
    </svg>`
  },
  {
    name: 'Orders',
    url: AppUrls.shopManageOrder,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>`
  },
  {
    name: 'Settings',
    url: AppUrls.shopSetting,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`
  }
]

// Categories
export const Categories = [
  {
    name: "Men's Clothes",
    id: "men's-clothes",
    thumbnail: men
  },
  {
    name: "Women's Clothes",
    id: "women's-clothes",
    thumbnail: women
  },
  {
    name: 'Home & Living',
    id: 'home-&-living',
    thumbnail: homeAndLiving
  },
  {
    name: 'Accessories',
    id: 'accessories',
    thumbnail: accessories
  }
]

// EditorTabs
export const EditorTabs = [
  {
    name: 'colorpicker',
    tag: 'Edit',
    icon: swatch
  },
  {
    name: 'filepicker',
    tag: 'Upload',
    icon: fileIcon
  },
  {
    name: 'aipicker',
    tag: 'Ask AI',
    icon: ai
  }
] as const

// Filter tabs
export const FilterTabs = [
  {
    name: 'logoTab',
    tag: '',
    icon: logoShirt
  },
  {
    name: 'stylishTab',
    tag: '',
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

// Aside filters
export const ClothingTypes = [
  { name: 'T-shirts', id: '1' },
  { name: 'Long Sleeves', id: '2' },
  { name: 'Tank Tops', id: '3' },
  { name: 'Skirts & Dresses', id: '4' },
  { name: 'Bottoms', id: '5' }
]

export const ClothingSizes = [
  { name: 'XS', id: 'xs' },
  { name: 'S', id: 's' },
  { name: 'M', id: 'm' },
  { name: 'L', id: 'l' },
  { name: 'XL', id: 'xl' },
  { name: '2XL', id: '2xl' }
]

export const HomeAndLivingTypes = [
  { name: 'Mugs', id: '6' },
  { name: 'Bottles & Tumblers', id: '7' },
  { name: 'Poster', id: '8' },
  { name: 'Notebooks', id: '9' },
  { name: 'Other', id: '' }
]

export const AccessoriesTypes = [
  { name: 'Phone Cases', id: '' },
  { name: 'Bags', id: '' },
  { name: 'Mouse Pads', id: '' },
  { name: 'Hats', id: '' },
  { name: 'Other', id: '' }
]

export const OtherSizes = [{ name: 'One size', id: 'one_size' }]

export const ShippingLocations = [
  { name: 'Ha Noi', id: 'hanoi' },
  { name: 'Ho Chi Minh City', id: 'hcm' },
  { name: 'Da Nang', id: 'danang' },
  { name: 'Oversea', id: 'oversea' }
]

// Sortby filters
export const SortByFilters = [
  { title: 'Popularity', id: 'popularity' },
  { title: 'Lowest price', id: 'lowest_price' },
  { title: 'Highest price', id: 'highest_price' }
]
