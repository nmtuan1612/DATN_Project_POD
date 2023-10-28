import { Product, ProductListConfig, ProductVariant } from 'src/types/product.type'
import http from 'src/utils/http'

const productApi = {
  addSample(body: any) {
    return http.post('/product/new-sample', body)
  },
  getListSampleProducts(params: ProductListConfig) {
    return http.get('/product/sample', { params })
  },
  searchSampleProducts(params: ProductListConfig) {
    return http.get('/product/sample/search', { params })
  },
  getSampleProductWithId(productId: string) {
    return http.get(`/product/sample/${productId}`)
  },

  // custom product
  addStoreProduct(body: any) {
    return http.post('/product/new-custom', body)
  },
  updateStoreProduct(productId: string, body: any) {
    return http.put(`/product/custom/${productId}`, body)
  },
  updateListStoreProducts(body: any) {
    return http.put('/product/list-custom/update', body)
  },
  deleteStoreProduct(body: any) {
    return http.delete('/product/custom', { data: body })
  },
  getStoreProductWithId(productId: string) {
    return http.get(`/product/custom/${productId}`)
  },

  // product variants
  addProductVariants(body: any) {
    return http.post('/product/custom-variants', body)
  },
  getListProductVariants(params: { listIds: string[] }) {
    console.log(params)
    return http.get('/product/custom-variants', { params })
  },
  updateProductVariants(body: any) {
    return http.put('/product/custom-variants', body)
  }
}

export default productApi
