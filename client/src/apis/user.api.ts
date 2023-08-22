import path from 'src/config/path'
import http from 'src/utils/http'

type BodyUpdateAccount = any

const userApi = {
  getUser(params: { id: string }) {
    return http.get(path.user, { params })
  },
  updateAccount(body: BodyUpdateAccount) {
    return http.put(path.user, body)
  }
}

export default userApi
