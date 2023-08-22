import path from 'src/config/path'
import http from 'src/utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post(path.register, body)
  },
  login(body: { email: string; password: string }) {
    return http.post(path.login, body)
  },
  logout() {
    return http.post(path.logout)
  }
}
export default authApi
