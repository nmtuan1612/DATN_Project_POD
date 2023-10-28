import { Product, SampleProduct, SampleProductDetail } from 'src/types/product.type'

export const sizeGuides = {
  sizes: ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  types: [
    {
      name: 'Width',
      units: 'length',
      ranges: [
        { from: '435', to: '' },
        { from: '460', to: '' },
        { from: '490', to: '' },
        { from: '520', to: '' },
        { from: '550', to: '' },
        { from: '580', to: '' },
        { from: '610', to: '' },
        { from: '640', to: '' },
        { from: '690', to: '' },
        { from: '740', to: '' }
      ]
    },
    {
      name: 'Height',
      units: 'length',
      ranges: [
        { from: '640', to: '' },
        { from: '660', to: '' },
        { from: '690', to: '' },
        { from: '720', to: '' },
        { from: '740', to: '' },
        { from: '760', to: '' },
        { from: '780', to: '' },
        { from: '800', to: '' },
        { from: '820', to: '' },
        { from: '840', to: '' }
      ]
    },
    {
      name: 'Sleeve length',
      units: 'length',
      ranges: [
        { from: '190', to: '' },
        { from: '195', to: '' },
        { from: '205', to: '' },
        { from: '215', to: '' },
        { from: '225', to: '' },
        { from: '225', to: '' },
        { from: '235', to: '' },
        { from: '245', to: '' },
        { from: '245', to: '' },
        { from: '250', to: '' }
      ]
    }
  ]
}

export const productMockData: Product = {
  _id: '123',
  storeIds: ['string'],
  modelMetaData: {
    _id: '1234',
    modelUrl: 'https://res.cloudinary.com/duyb3dqsr/image/upload/v1693685044/POD_Model/shirt_baked.glb',
    groupScale: 0.1,
    logoPosition: [0, 1.7, 1],
    logoScale: 1,
    fullTexturePosition: [0, 0, 0],
    textureScale: 1
  },
  category: [
    { _id: '456', name: 'Neck Labels' },
    { _id: '6', name: 'Crew neck' },
    { _id: '7', name: 'Cotton' },
    { _id: '5', name: 'Regular fit' },
    { _id: '4', name: 'DTG' },
    { _id: '3', name: "Kids' Clothing" },
    { _id: '2', name: 'T-shirts' }
  ],
  name: "Men's sport tee",
  details: [
    'Medium fabric (5.3 oz/yd² (180 g/m²))',
    'Classic fit',
    'Runs true to size',
    '100% cotton (fiber content may vary for different colors)',
    'Tear-away label'
  ],
  description:
    'The unisex heavy cotton tee is the basic staple of any wardrobe. It is the foundation upon which casual fashion grows. All it needs is a personalized design to elevate things to profitability. The specially spun fibers provide a smooth surface for premium printing vividity and sharpness. No side seams mean there are no itchy interruptions under the arms. The shoulders have tape for improved durability.',
  price: 14.5,
  printBrand: '',
  type: {
    id: '1',
    name: 'T-shirt'
  },
  hiddenTag: 'Bestseller',
  status: 'published',
  rating: 4.8,
  sold: 456,
  image: 'https://images.printify.com/api/catalog/643cfea7d1be3ef343016b73.jpg?s=432',
  otherImages: [
    'https://images.printify.com/api/catalog/643cfea7d1be3ef343016b73.jpg?s=432',
    'https://images.printify.com/api/catalog/643cfeabe95f9578ab0f3f53.jpg?s=432',
    'https://images.printify.com/api/catalog/643cfeaec77fc5bffd0a8857.jpg?s=432'
  ],
  createdAt: 'string',
  updatedAt: 'string'
}

export const sampleProductMockData: SampleProductDetail = {
  _id: '123',
  categoryIds: ['456'],
  name: "Men's sport tee",
  details: [
    'Medium fabric (5.3 oz/yd² (180 g/m²))',
    'Classic fit',
    'Runs true to size',
    '100% cotton (fiber content may vary for different colors)',
    'Tear-away label'
  ],
  description:
    'The unisex heavy cotton tee is the basic staple of any wardrobe. It is the foundation upon which casual fashion grows. All it needs is a personalized design to elevate things to profitability. The specially spun fibers provide a smooth surface for premium printing vividity and sharpness. No side seams mean there are no itchy interruptions under the arms. The shoulders have tape for improved durability.',
  price: 14.5,
  printBrand: '',
  modelId: '',
  modelMetaData: {
    _id: '1234',
    modelUrl: 'https://res.cloudinary.com/duyb3dqsr/image/upload/v1693685044/POD_Model/shirt_baked.glb',
    groupScale: 0.1,
    logoPosition: [0, 1.7, 1],
    logoScale: 1,
    fullTexturePosition: [0, 0, 0],
    textureScale: 1
  },
  typeId: '1',
  type: {
    _id: '1',
    name: 'T-shirt',
    categoryIds: ['']
  },
  hiddenTag: 'Bestseller',
  image: 'https://images.printify.com/api/catalog/643cfea7d1be3ef343016b73.jpg?s=432',
  otherImages: [
    // 'https://images.printify.com/api/catalog/643cfea7d1be3ef343016b73.jpg?s=432',
    'https://images.printify.com/api/catalog/643cfeabe95f9578ab0f3f53.jpg?s=432',
    'https://images.printify.com/api/catalog/643cfeaec77fc5bffd0a8857.jpg?s=432'
  ],
  sizeGuides: sizeGuides,
  createdAt: 'string',
  updatedAt: 'string'
}

export const bottleSizes = {
  sizes: ['12oz', '18oz', '32oz'],
  types: [
    {
      name: 'Height',
      units: 'length',
      ranges: [
        { from: '250', to: '' },
        { from: '240', to: '' },
        { from: '270', to: '' }
      ]
    },
    {
      name: 'Diameter',
      units: 'length',
      ranges: [
        { from: '73', to: '' },
        { from: '73', to: '' },
        { from: '90', to: '' }
      ]
    }
  ]
}

export const dressSizeGuides = {
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
  types: [
    {
      name: 'Chest width',
      units: 'length',
      ranges: [
        { from: '381', to: '' },
        { from: '406.4', to: '' },
        { from: '444.5', to: '' },
        { from: '469.9', to: '' },
        { from: '520.7', to: '' },
        { from: '571.5', to: '' }
      ]
    },
    {
      name: 'Length',
      units: 'length',
      ranges: [
        { from: '889', to: '' },
        { from: '914.4', to: '' },
        { from: '927.1', to: '' },
        { from: '927.1', to: '' },
        { from: '927.1', to: '' },
        { from: '939.8', to: '' }
      ]
    }
  ]
}

// men's-clothes, women's-clothes
// This tee was created to be a versatile and stylish companion for all your casual appearances. With its uniquely textured, thick, microfiber-knit fabric, this t-shirt bears a premium, soft feel that remains lightweight and highly breathable – the perfect combo for a hot day or layering.
// 100% Polyester, Light fabric (4.0 oz/yd² (113 g/m²)) / (6.0 oz/yd² (170 g/m²)), Regular fit, Tagless, Runs true to size, Assembled in the USA from globally sourced parts
// https://images.printify.com/api/catalog/5d4a8b61cd233b00151d301b.jpg?s=432

// Stainless Steel Water Bottle
// home-&-living
// Quench your thirst in style with this stainless steel water bottle made for adventures. Available in 3 sizes (12oz, 18oz, 32oz), this water bottle features a double-wall stainless steel build that keeps your drinks warm for 12h and cold for 24h. This BPA-free, robust adventure companion comes with a handle lid, making it effortless to carry wherever your day takes you.
// Twist-on lid, Double-wall stainless steel construction, Sizes: 14 oz (0.41 l)
// https://images.printify.com/api/catalog/5d5fe8cf17a03100174b941d.jpg?s=432
// https://images.printify.com/api/catalog/635293fbe10ed831660375a3.jpg?s=220,
// 7

const dummyData = {
  blueprintId: 6,
  brandName: 'Gildan',
  careSets: [
    {
      set: 'Washing',
      icon: '59e737edb8e7e349924a4503',
      option: 'Machine wash: warm (max 40C or 105F)'
    },
    {
      set: 'Bleaching',
      icon: '59e0f7bdb8e7e31747148874',
      option: 'Non-chlorine: bleach as needed'
    },
    {
      set: 'Drying',
      icon: '59e0f9a5b8e7e30a60795f96',
      option: 'Tumble dry: medium'
    },
    {
      set: 'Ironing',
      icon: '59e0f841b8e7e30a5b0a55ba',
      option: 'Do not iron\r\n'
    },
    {
      set: 'Drycleaning ',
      icon: '5f7f1ca9104c523b41518e2e',
      option: 'Do not dryclean\r\n'
    }
  ],
  printProviders: [
    {
      id: 50,
      minPrice: 961,
      minPriceSubscription: 768,
      name: 'Underground Threads',
      twoDaysDeliveryEnabled: false,
      details: {
        technology:
          'Aeoon KYO and Kornit Storm Hexa are state-of-the-art digital presses, which provide the highest quality output. \n\nInks: Kyo utilizes Dupont inks that are environmentally friendly and are Oeko-Tex and GOTS certified. The vibrant colors provide astonishing results on black, white, and various color textiles. Storm Hexa - Neo Pigment Inks are non-hazardous, non-toxic, and biodegradable. ',
        qualityControl:
          'Garments are individually inspected during each phase of the process, to ensure the correct size, image and highest quality print are received.',
        packaging: {
          content: 'The products are shipped in self-sealing poly bags.',
          files: ['60dd7575beec3e15c24a851f']
        }
      },
      bulkDiscountEnabled: false,
      averageBusinessDaysInProduction: 2.9,
      location: {
        country: 'United States',
        countryCode: 'US',
        isInternational: false
      },
      rankingScore: 99,
      printPosition: [
        {
          label: 'Back side',
          position: 'back'
        },
        {
          label: 'Front side',
          position: 'front'
        }
      ],
      scoring: {
        generic_score: 9.326,
        quality: 9.757,
        production_speed: 9.153,
        stock_reliability: 9.992,
        courtesy: 9.992
      },
      shipping: [
        {
          country: 'United States',
          additional: 219,
          first: 519,
          type: 'All',
          method: 'standard',
          destinationGroupId: 172,
          destinationGroupLabel: 'United States'
        },
        {
          country: 'United States',
          additional: 219,
          first: 519,
          type: 'All',
          method: 'standard',
          destinationGroupId: 172,
          destinationGroupLabel: 'United States'
        },
        {
          country: 'Canada',
          additional: 439,
          first: 939,
          type: 'All',
          method: 'standard',
          destinationGroupId: 173,
          destinationGroupLabel: 'Canada'
        },
        {
          country: 'Canada',
          additional: 439,
          first: 939,
          type: 'All',
          method: 'standard',
          destinationGroupId: 173,
          destinationGroupLabel: 'Canada'
        },
        {
          country: 'Rest of World',
          additional: 400,
          first: 1000,
          type: 'All',
          method: 'standard',
          destinationGroupId: 0,
          destinationGroupLabel: 'Rest of World'
        },
        {
          country: 'Rest of World',
          additional: 400,
          first: 1000,
          type: 'All',
          method: 'standard',
          destinationGroupId: 0,
          destinationGroupLabel: 'Rest of World'
        },
        {
          country: 'Australia',
          additional: 499,
          first: 1249,
          type: 'All',
          method: 'standard',
          destinationGroupId: 0,
          destinationGroupLabel: 'Australia'
        },
        {
          country: 'Australia',
          additional: 499,
          first: 1249,
          type: 'All',
          method: 'standard',
          destinationGroupId: 0,
          destinationGroupLabel: 'Australia'
        }
      ],
      minShipping: 519,
      brandingFeatures: [],
      facilities: [
        {
          id: 146,
          country_label: 'United States',
          country_code: 'US',
          region_label: 'USA',
          region_code: 'usa'
        },
        {
          id: 50,
          country_label: 'United States',
          country_code: 'US',
          region_label: 'USA',
          region_code: 'usa'
        }
      ],
      tags: [],
      variants: [
        {
          id: 12030,
          options: [425, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12122,
          options: [513, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11903,
          options: [367, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Print Geek',
            'Drive Fulfillment',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11877,
          options: [424, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Print Clever',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11897,
          options: [362, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12076,
          options: [554, 16],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11985,
          options: [552, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'SwiftPOD', 'FYBY'],
          status: 'in-stock',
          costs: [
            {
              blank: 487,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1481,
              resultSubscription: 1184
            }
          ]
        },
        {
          id: 12150,
          options: [438, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12024,
          options: [423, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12059,
          options: [436, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11853,
          options: [366, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Duplium', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12054,
          options: [421, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Stacked Commerce',
            'Print Clever',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12148,
          options: [438, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12151,
          options: [438, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12152,
          options: [438, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12028,
          options: [425, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12005,
          options: [535, 15],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 24088,
          options: [424, 21],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11888,
          options: [386, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11902,
          options: [367, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Print Geek',
            'Drive Fulfillment',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12025,
          options: [423, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12029,
          options: [425, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12165,
          options: [437, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Monster Digital', 'Fulfill Engine', 'SwiftPOD', 'FYBY'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11962,
          options: [433, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Logistic',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12209,
          options: [372, 15],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11983,
          options: [552, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Duplium',
            'T Shirt and Sons',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11988,
          options: [511, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11987,
          options: [511, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11907,
          options: [367, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Print Geek',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12193,
          options: [364, 17],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12194,
          options: [364, 18],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12123,
          options: [513, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12124,
          options: [418, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 24099,
          options: [367, 21],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Dimona Tee', 'SwiftPOD', 'Marco Fine Arts'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12031,
          options: [425, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11896,
          options: [362, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12032,
          options: [425, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12104,
          options: [521, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 409,
              fee: 0,
              margin: 33,
              printing: 405,
              placeholders: ['front'],
              result: 1215,
              resultSubscription: 971
            }
          ]
        },
        {
          id: 12063,
          options: [436, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12081,
          options: [554, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11966,
          options: [433, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Logistic',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12100,
          options: [521, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 239,
              fee: 0,
              margin: 33,
              printing: 405,
              placeholders: ['front'],
              result: 961,
              resultSubscription: 768
            }
          ]
        },
        {
          id: 12118,
          options: [513, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12007,
          options: [535, 17],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11924,
          options: [412, 18],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11984,
          options: [552, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 411,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1367,
              resultSubscription: 1093
            }
          ]
        },
        {
          id: 12062,
          options: [436, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12022,
          options: [423, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11980,
          options: [552, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Duplium',
            'T Shirt and Sons',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12208,
          options: [372, 16],
          available: false,
          availablePrintProviders: ['Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11899,
          options: [362, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12213,
          options: [372, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12017,
          options: [398, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12127,
          options: [418, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12128,
          options: [418, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12129,
          options: [418, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12159,
          options: [407, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11886,
          options: [386, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11885,
          options: [386, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11921,
          options: [412, 15],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12103,
          options: [521, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 239,
              fee: 0,
              margin: 33,
              printing: 405,
              placeholders: ['front'],
              result: 961,
              resultSubscription: 768
            }
          ]
        },
        {
          id: 12121,
          options: [513, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11827,
          options: [537, 17],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12119,
          options: [513, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'T Shirt and Sons',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11863,
          options: [403, 17],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12125,
          options: [418, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11898,
          options: [362, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12080,
          options: [554, 18],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12006,
          options: [535, 14],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12155,
          options: [407, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12191,
          options: [364, 15],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12016,
          options: [398, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12180,
          options: [434, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 23963,
          options: [362, 20],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Monster Digital', 'Fulfill Engine', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11982,
          options: [552, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12182,
          options: [434, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12061,
          options: [436, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12101,
          options: [521, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 239,
              fee: 0,
              margin: 33,
              printing: 405,
              placeholders: ['front'],
              result: 961,
              resultSubscription: 768
            }
          ]
        },
        {
          id: 12158,
          options: [407, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12211,
          options: [372, 17],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12212,
          options: [372, 18],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11851,
          options: [366, 17],
          available: true,
          availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12064,
          options: [551, 16],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12067,
          options: [551, 17],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12068,
          options: [551, 18],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 24153,
          options: [358, 21],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Print Logistic',
            'Print Clever',
            'SwiftPOD',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12077,
          options: [554, 15],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12079,
          options: [554, 17],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 23965,
          options: [367, 20],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Dimona Tee',
            'Fulfill Engine',
            'SwiftPOD',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11925,
          options: [412, 19],
          available: false,
          availablePrintProviders: [],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12021,
          options: [398, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12070,
          options: [358, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12074,
          options: [358, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12183,
          options: [434, 19],
          available: false,
          availablePrintProviders: ['The Print Bar', 'Fulfill Engine', 'Duplium', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12190,
          options: [364, 16],
          available: false,
          availablePrintProviders: [
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12026,
          options: [423, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11904,
          options: [367, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Print Geek',
            'Drive Fulfillment',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11952,
          options: [369, 14],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11824,
          options: [537, 16],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 24048,
          options: [407, 20],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 24182,
          options: [407, 21],
          available: true,
          availablePrintProviders: ['Underground Threads', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12057,
          options: [421, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'Drive Fulfillment',
            'Dimona Tee',
            'Fulfill Engine',
            'Stacked Commerce',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12195,
          options: [364, 19],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12149,
          options: [438, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12164,
          options: [437, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Monster Digital',
            'Awkward Styles',
            'Fulfill Engine',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11849,
          options: [366, 15],
          available: true,
          availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11957,
          options: [392, 15],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12153,
          options: [438, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Fulfill Engine',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11865,
          options: [403, 19],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11872,
          options: [424, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Print Clever',
            'T Shirt and Sons',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11889,
          options: [386, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12163,
          options: [437, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Monster Digital',
            'Awkward Styles',
            'Fulfill Engine',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12181,
          options: [434, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11850,
          options: [366, 14],
          available: true,
          availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11875,
          options: [424, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Print Clever',
            'T Shirt and Sons',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11876,
          options: [424, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Print Clever',
            'T Shirt and Sons',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12060,
          options: [436, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12120,
          options: [513, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 23955,
          options: [424, 20],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Monster Digital',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12102,
          options: [521, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 239,
              fee: 0,
              margin: 33,
              printing: 405,
              placeholders: ['front'],
              result: 961,
              resultSubscription: 768
            }
          ]
        },
        {
          id: 12192,
          options: [364, 14],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12052,
          options: [421, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Stacked Commerce',
            'Print Clever',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12126,
          options: [418, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'X-Print',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12162,
          options: [437, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Monster Digital',
            'Awkward Styles',
            'Fulfill Engine',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12179,
          options: [434, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12178,
          options: [434, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 24060,
          options: [364, 20],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Monster Digital', 'Dimona Tee'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 24194,
          options: [364, 21],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Monster Digital', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11829,
          options: [537, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12027,
          options: [423, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11950,
          options: [369, 16],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11955,
          options: [369, 19],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11860,
          options: [403, 16],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11990,
          options: [511, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12055,
          options: [421, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Stacked Commerce',
            'Print Clever',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 24021,
          options: [358, 20],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11864,
          options: [403, 18],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12210,
          options: [372, 14],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11981,
          options: [552, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'OPT OnDemand',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12008,
          options: [535, 18],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11861,
          options: [403, 15],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11873,
          options: [424, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Print Clever',
            'T Shirt and Sons',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11874,
          options: [424, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Print Clever',
            'T Shirt and Sons',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11905,
          options: [367, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Print Geek',
            'Drive Fulfillment',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11825,
          options: [537, 15],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11826,
          options: [537, 14],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11852,
          options: [366, 18],
          available: true,
          availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11900,
          options: [362, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11901,
          options: [362, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Monster Digital',
            'Print Geek',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11922,
          options: [412, 14],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11828,
          options: [537, 18],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11964,
          options: [433, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Logistic',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11960,
          options: [392, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11961,
          options: [392, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11848,
          options: [366, 16],
          available: true,
          availablePrintProviders: ['Underground Threads', 'The Print Bar', 'Duplium', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11862,
          options: [403, 14],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11967,
          options: [433, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'Fulfill Engine',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11884,
          options: [386, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11986,
          options: [511, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11887,
          options: [386, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11991,
          options: [511, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11920,
          options: [412, 16],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12018,
          options: [398, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12019,
          options: [398, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11963,
          options: [433, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Logistic',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11923,
          options: [412, 17],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12056,
          options: [421, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Stacked Commerce',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 11951,
          options: [369, 15],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11989,
          options: [511, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11953,
          options: [369, 17],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11958,
          options: [392, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12069,
          options: [551, 19],
          available: true,
          availablePrintProviders: ['Underground Threads'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12065,
          options: [551, 15],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12020,
          options: [398, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12004,
          options: [535, 16],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11956,
          options: [392, 16],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12066,
          options: [551, 14],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Print Clever'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11906,
          options: [367, 18],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Print Geek',
            'Drive Fulfillment',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12078,
          options: [554, 14],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12071,
          options: [358, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12009,
          options: [535, 19],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 11954,
          options: [369, 18],
          available: false,
          availablePrintProviders: [
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 421,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1382,
              resultSubscription: 1105
            }
          ]
        },
        {
          id: 12023,
          options: [423, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11959,
          options: [392, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12156,
          options: [407, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 11965,
          options: [433, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Logistic',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12053,
          options: [421, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Stacked Commerce',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12161,
          options: [437, 15],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Monster Digital',
            'Awkward Styles',
            'Fulfill Engine',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12105,
          options: [521, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 487,
              fee: 0,
              margin: 33,
              printing: 405,
              placeholders: ['front'],
              result: 1331,
              resultSubscription: 1064
            }
          ]
        },
        {
          id: 12033,
          options: [425, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12075,
          options: [358, 19],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        },
        {
          id: 12072,
          options: [358, 14],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Logistic',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12073,
          options: [358, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Textildruck Europa',
            'Stoked On Printing',
            'Monster Digital',
            'Print Geek',
            'The Print Bar',
            'Drive Fulfillment',
            'Awkward Styles',
            'OPT OnDemand',
            'Dimona Tee',
            'Fulfill Engine',
            'Duplium',
            'Stacked Commerce',
            'Print Clever',
            'T Shirt and Sons',
            'SwiftPOD',
            'FYBY',
            'Marco Fine Arts',
            'PH Print Norden',
            'Prima Printing'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12154,
          options: [407, 16],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Fulfill Engine', 'Duplium', 'Print Clever', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12157,
          options: [407, 17],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'The Print Bar',
            'Fulfill Engine',
            'Duplium',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12058,
          options: [436, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Awkward Styles',
            'Fulfill Engine',
            'Print Clever',
            'SwiftPOD'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 12160,
          options: [437, 16],
          available: true,
          availablePrintProviders: [
            'Underground Threads',
            'Monster Digital',
            'Awkward Styles',
            'Fulfill Engine',
            'SwiftPOD',
            'FYBY'
          ],
          status: 'in-stock',
          costs: [
            {
              blank: 247,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1122,
              resultSubscription: 897
            }
          ]
        },
        {
          id: 24097,
          options: [362, 21],
          available: true,
          availablePrintProviders: ['Underground Threads', 'Monster Digital', 'SwiftPOD'],
          status: 'in-stock',
          costs: [
            {
              blank: 545,
              fee: 0,
              margin: 33,
              printing: 505,
              placeholders: ['front'],
              result: 1567,
              resultSubscription: 1253
            }
          ]
        }
      ],
      options: [
        {
          type: 'size',
          items: [
            {
              id: 14,
              label: 'S'
            },
            {
              id: 15,
              label: 'M'
            },
            {
              id: 16,
              label: 'L'
            },
            {
              id: 17,
              label: 'XL'
            },
            {
              id: 18,
              label: '2XL'
            },
            {
              id: 19,
              label: '3XL'
            },
            {
              id: 20,
              label: '4XL'
            },
            {
              id: 21,
              label: '5XL'
            }
          ]
        },
        {
          type: 'color',
          items: [
            {
              id: 358,
              label: 'Sport Grey',
              colorGroup: {
                id: 10
              },
              colors: [
                {
                  hex: '#CACACA',
                  pattern: '5853fecfce46f30f832820b5',
                  rgb: '180,179,178'
                }
              ]
            },
            {
              id: 362,
              label: 'Dark Chocolate',
              colorGroup: {
                id: 18
              },
              colors: [
                {
                  hex: '#31221D',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '61, 44, 38'
                }
              ]
            },
            {
              id: 364,
              label: 'Military Green',
              colorGroup: {
                id: 36
              },
              colors: [
                {
                  hex: '#585c3b',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '88, 92, 59'
                }
              ]
            },
            {
              id: 366,
              label: 'Ash',
              colorGroup: {
                id: 10
              },
              colors: [
                {
                  hex: '#F6F6F6',
                  pattern: '5853fecfce46f30f832820b2',
                  rgb: '246,246,246'
                }
              ]
            },
            {
              id: 367,
              label: 'Dark Heather',
              colorGroup: {
                id: 43
              },
              colors: [
                {
                  hex: '#454545',
                  pattern: '5853fed0ce46f30f8328211b',
                  rgb: '85,106,111'
                }
              ]
            },
            {
              id: 369,
              label: 'Irish Green',
              colorGroup: {
                id: 35
              },
              colors: [
                {
                  hex: '#129447',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '0,174,64'
                }
              ]
            },
            {
              id: 372,
              label: 'Sunset',
              colorGroup: {
                id: 30
              },
              colors: [
                {
                  hex: '#ed8957',
                  pattern: '5853fecfce46f30f832820bb',
                  rgb: '220,107,47'
                }
              ]
            },
            {
              id: 386,
              label: 'Cornsilk',
              colorGroup: {
                id: 31
              },
              colors: [
                {
                  hex: '#F7EF8F',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '250, 247, 172'
                }
              ]
            },
            {
              id: 392,
              label: 'Light Blue',
              colorGroup: {
                id: 39
              },
              colors: [
                {
                  hex: '#d6e6f7',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '164,200,225'
                }
              ]
            },
            {
              id: 398,
              label: 'Purple',
              colorGroup: {
                id: 25
              },
              colors: [
                {
                  hex: '#3C214E',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '75,42,97'
                }
              ]
            },
            {
              id: 403,
              label: 'Brown Savana',
              colorGroup: {
                id: 17
              },
              colors: [
                {
                  hex: '#948272',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '148, 130, 120'
                }
              ]
            },
            {
              id: 407,
              label: 'Graphite Heather',
              colorGroup: {
                id: 7
              },
              colors: [
                {
                  hex: '#707372',
                  pattern: null,
                  rgb: '112,115,114'
                }
              ]
            },
            {
              id: 412,
              label: 'Gravel',
              colorGroup: {
                id: 7
              },
              colors: [
                {
                  hex: '#9CA1A3',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '176, 181, 178'
                }
              ]
            },
            {
              id: 418,
              label: 'Black',
              colorGroup: {
                id: 2
              },
              colors: [
                {
                  hex: '#000000',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '5,5,5'
                }
              ]
            },
            {
              id: 421,
              label: 'Sand',
              colorGroup: {
                id: 17
              },
              colors: [
                {
                  hex: '#DCD2BE',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '224, 214, 197'
                }
              ]
            },
            {
              id: 423,
              label: 'Red',
              colorGroup: {
                id: 28
              },
              colors: [
                {
                  hex: '#C62A32',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '210,21,31'
                }
              ]
            },
            {
              id: 424,
              label: 'Charcoal',
              colorGroup: {
                id: 43
              },
              colors: [
                {
                  hex: '#585559',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '74, 79, 82'
                }
              ]
            },
            {
              id: 425,
              label: 'Royal',
              colorGroup: {
                id: 41
              },
              colors: [
                {
                  hex: '#084f97',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '8,79,151'
                }
              ]
            },
            {
              id: 433,
              label: 'Light Pink',
              colorGroup: {
                id: 22
              },
              colors: [
                {
                  hex: '#FEE0EB',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '255, 212, 231'
                }
              ]
            },
            {
              id: 434,
              label: 'Lime',
              colorGroup: {
                id: 34
              },
              colors: [
                {
                  hex: '#9EC46C',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '146,191,85'
                }
              ]
            },
            {
              id: 436,
              label: 'Sapphire',
              colorGroup: {
                id: 38
              },
              colors: [
                {
                  hex: '#0080b5',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '0, 119, 181'
                }
              ]
            },
            {
              id: 437,
              label: 'Ice Grey',
              colorGroup: {
                id: 10
              },
              colors: [
                {
                  hex: '#D7D6D3',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '215,210,203'
                }
              ]
            },
            {
              id: 438,
              label: 'Gold',
              colorGroup: {
                id: 31
              },
              colors: [
                {
                  hex: '#ffb81c',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '255,184,28'
                }
              ]
            },
            {
              id: 511,
              label: 'Navy',
              colorGroup: {
                id: 41
              },
              colors: [
                {
                  hex: '#1a2237',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '31,42,68'
                }
              ]
            },
            {
              id: 513,
              label: 'Azalea',
              colorGroup: {
                id: 21
              },
              colors: [
                {
                  hex: '#EF8FBC',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '239,104,168'
                }
              ]
            },
            {
              id: 521,
              label: 'White',
              colorGroup: {
                id: 3
              },
              colors: [
                {
                  hex: '#ffffff',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '249,249,249'
                }
              ]
            },
            {
              id: 535,
              label: 'Old Gold',
              colorGroup: {
                id: 17
              },
              colors: [
                {
                  hex: '#C99B5C',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '189,147,87'
                }
              ]
            },
            {
              id: 537,
              label: 'Tennessee Orange',
              colorGroup: {
                id: 30
              },
              colors: [
                {
                  hex: '#F79B2E',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '255,137,64'
                }
              ]
            },
            {
              id: 551,
              label: 'Sky',
              colorGroup: {
                id: 39
              },
              colors: [
                {
                  hex: '#8BCDEA',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '150, 227, 255'
                }
              ]
            },
            {
              id: 552,
              label: 'Natural',
              colorGroup: {
                id: 16
              },
              colors: [
                {
                  hex: '#F6F0E1',
                  pattern: '5853fec7ce46f30f8328200a',
                  rgb: '247, 244, 225'
                }
              ]
            },
            {
              id: 554,
              label: 'Texas Orange',
              colorGroup: {
                id: 30
              },
              colors: [
                {
                  hex: '#c26928',
                  pattern: '5853fecdce46f30f832820ac',
                  rgb: '182,90,48'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  description:
    'The unisex heavy cotton tee is the basic staple of any wardrobe. It is the foundation upon which casual fashion grows. All it needs is a personalized design to elevate things to profitability. The specially spun fibers provide a smooth surface for premium printing vividity and sharpness. No side seams mean there are no itchy interruptions under the arms. The shoulders have tape for improved durability.',
  details: [
    'Medium fabric (5.3 oz/yd² (180 g/m²))',
    'Classic fit',
    'Runs true to size',
    '100% cotton (fiber content may vary for different colors)',
    'Tear-away label'
  ],
  features: [
    {
      name: 'Shoulder tape',
      description: 'Twill tape covers the shoulder seams to stabilize the back of the garment and prevent stretching',
      image: '59e0ea55b8e7e34c675732f9/icons_v4_outlined_37_shoulder_tape.svg'
    },
    {
      name: 'Fiber composition',
      description:
        'Solid colors are 100% cotton;\nHeather colors are 50% cotton, 50% polyester (Sport Grey and Antique colors are 90% cotton, 10% polyester. Ash is 99% cotton, 1% polyester)',
      image: '59e0e608b8e7e33b2f5b1e90/icons_v4_outlined_1_cotton.svg'
    },
    {
      name: 'Without side seams',
      description:
        'Knitted in one piece using tubular knit, it reduces fabric waste and makes the garment more attractive',
      image: '59e0e9ebb8e7e30aa54c3178/icons_v4_outlined_34_without_side_seams.svg'
    },
    {
      name: 'Ribbed knit collar without seam',
      description: 'Ribbed knit makes the collar highly elastic and helps retain its shape',
      image: '59e0ef39b8e7e36e403b5906/icons_v4_outlined_39_collar_seam.svg'
    },
    {
      name: 'Fabric',
      description:
        'Made from specially spun fibers that make a very strong and smooth fabric that is perfect for printing. The "Natural" color is made with unprocessed cotton, which results in small black flecks throughout the fabric',
      image: '59e0e88bb8e7e3174714886e/icons_v4_outlined_21_cover.svg'
    }
  ],
  hiddenTags: ['Bestsellers', 'positioner update', 'Printify Express', 'MOP'],
  media: [
    {
      src: '6437eef54e3cf4dd08026347',
      catalogPreview: ["Women's Clothing"]
    },
    {
      src: '64394d8c2a4d01d9960aa971',
      catalogPreview: ["Women's Clothing", 'Hover Feature']
    },
    {
      src: '6283a8e2515ac64e9e044594',
      catalogPreview: []
    },
    {
      src: '6437f070c6bb23f9e309d093',
      catalogPreview: ["Men's Clothing"]
    },
    {
      src: '64394d93fe5f3d8d500785e1',
      catalogPreview: ["Men's Clothing", 'Hover Feature']
    },
    {
      src: '643968472686b61fe80abf2a',
      catalogPreview: []
    },
    {
      src: '6283a8de515ac64e9e04458e',
      catalogPreview: []
    },
    {
      src: '643967bb09be95024805f8ca',
      catalogPreview: []
    },
    {
      src: '643966f109be95024805f8c3',
      catalogPreview: []
    },
    {
      src: '620b8374072629065746566b',
      catalogPreview: []
    },
    {
      src: '620b8375072629065746566e',
      catalogPreview: []
    },
    {
      src: '620b8375180ecf5ad95535fa',
      catalogPreview: []
    },
    {
      video:
        '<iframe width="560" height="415" src="https://www.youtube.com/embed/n9nZs1oOuSs?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    }
  ],
  type: 't-shirt',
  model: '5000',
  name: 'Unisex Heavy Cotton Tee',
  pricingPrintArea: 'front',
  seo: {
    title: 'Gildan 5000 | Unisex Heavy Cotton™ T-Shirt',
    description:
      "The Gildan 5000 heavy cotton adult t-shirt is a number one best seller. It's made from preshrunk cotton and comes in a variety of colors.",
    socialImage: ''
  },
  sizeGuide: {
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    types: [
      {
        name: 'Width',
        units: 'length',
        ranges: [
          {
            from: '457',
            to: ''
          },
          {
            from: '508',
            to: ''
          },
          {
            from: '558',
            to: ''
          },
          {
            from: '609',
            to: ''
          },
          {
            from: '660',
            to: ''
          },
          {
            from: '711',
            to: ''
          },
          {
            from: '763',
            to: ''
          },
          {
            from: '812',
            to: ''
          }
        ]
      },
      {
        name: 'Length',
        units: 'length',
        ranges: [
          {
            from: '711.2',
            to: ''
          },
          {
            from: '736.6',
            to: ''
          },
          {
            from: '762',
            to: ''
          },
          {
            from: '787.4',
            to: ''
          },
          {
            from: '812.8',
            to: ''
          },
          {
            from: '838.2',
            to: ''
          },
          {
            from: '863.6',
            to: ''
          },
          {
            from: '889',
            to: ''
          }
        ]
      },
      {
        name: 'Sleeve length',
        units: 'length',
        ranges: [
          {
            from: '184',
            to: ''
          },
          {
            from: '197',
            to: ''
          },
          {
            from: '209',
            to: ''
          },
          {
            from: '222',
            to: ''
          },
          {
            from: '235',
            to: ''
          },
          {
            from: '248',
            to: ''
          },
          {
            from: '260',
            to: ''
          },
          {
            from: '273',
            to: ''
          }
        ]
      }
    ]
  },
  tags: ["Men's Clothing", 'T-shirts', "Women's Clothing", 'DTG', 'Regular fit', 'Unisex', 'Crew neck', 'Neck Labels'],
  managed_tags: [
    {
      id: 456,
      label: 'Neck Labels',
      visible: true,
      promotional: false,
      rank: 10,
      icon: null
    },
    {
      id: 6,
      label: 'Crew neck',
      visible: true,
      promotional: false,
      rank: 10,
      icon: null
    },
    {
      id: 7,
      label: 'Cotton',
      visible: true,
      promotional: false,
      rank: 10,
      icon: null
    },
    {
      id: 5,
      label: 'Regular fit',
      visible: true,
      promotional: false,
      rank: 10,
      icon: null
    },
    {
      id: 4,
      label: 'DTG',
      visible: true,
      promotional: false,
      rank: 10,
      icon: null
    },
    {
      id: 3,
      label: "Kids' Clothing",
      visible: true,
      promotional: false,
      rank: 10,
      icon: null
    },
    {
      id: 2,
      label: 'T-shirts',
      visible: true,
      promotional: false,
      rank: 10,
      icon: null
    },
    {
      id: 1,
      label: 'positioner update',
      visible: false,
      promotional: false,
      rank: 10,
      icon: null
    }
  ]
}
