import { proxy } from 'valtio'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'
import { User } from 'src/types/user.type'

interface AuthState {
  isAuthenticated: boolean
  profile: User
}

const authState = proxy<AuthState>({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  profile: getProfileFromLS()
})

export default authState
