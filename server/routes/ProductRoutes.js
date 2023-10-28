import express from 'express'
import tokenMiddleWare from '../MiddleWare/VerifyAccessToken.js'
import {
  AddSampleProductToDB,
  getListSampleProducts,
  getSampleProductWithId,
  getTypes,
  searchSampleProducts
} from '../MongoDB/controllers/SampleProductController.js'
import {
  createNewProduct,
  deleteStoreProduct,
  getProductsCart,
  getProductsOfOnlineStore,
  // getProductsOfStore,
  getStoreProductWithId,
  updateListStoreProducts,
  updateStoreProduct
} from '../MongoDB/controllers/StoreProductController.js'
import {
  addProductVariants,
  getListProductVariants,
  updateProductVariants
} from '../MongoDB/controllers/ProductVariantController.js'

const ProductRouter = express.Router()

ProductRouter.post('/new-sample', AddSampleProductToDB)
ProductRouter.get('/sample', getListSampleProducts)
ProductRouter.get('/sample/search', searchSampleProducts)
ProductRouter.get('/sample/:id', getSampleProductWithId)
ProductRouter.get('/sample-types', getTypes)

ProductRouter.post('/new-custom', createNewProduct)
ProductRouter.get('/custom/:id', getStoreProductWithId)
ProductRouter.put('/custom/:id', updateStoreProduct)
ProductRouter.delete('/custom/', deleteStoreProduct)
ProductRouter.put('/list-custom/update', updateListStoreProducts)

// variants
ProductRouter.post('/custom-variants', addProductVariants)
ProductRouter.put('/custom-variants', updateProductVariants)
ProductRouter.get('/custom-variants', getListProductVariants)

// ProductRouter.get('/store-product/:storeId', getProductsOfStore)
// ProductRouter.get('/online-product/:storeId', getProductsOfOnlineStore)
ProductRouter.get('/store-product/:storeId', getProductsOfOnlineStore)
ProductRouter.get('/online-store/cart', getProductsCart)

export default ProductRouter
