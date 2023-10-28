import path from 'src/config/path'
import http from 'src/utils/http'

const commonApi = {
  uploadImage(body: FormData) {
    // console.log(body)
    return http.post(path.upload, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadBase64Image(body: any) {
    return http.post(`${path.upload}/base64-img`, body)
  },
  getSampleProductType: async (category: string) => {
    const data = await http.get('/product/sample-types', { params: { category } })
    return data.status === 200 ? data.data.data : []
  }
}

export default commonApi
