import path from 'src/config/path'
import http from 'src/utils/http'

const commonApi = {
  uploadImage(body: FormData) {
    console.log(body)
    return http.post(path.upload, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default commonApi
