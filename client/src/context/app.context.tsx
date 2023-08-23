import { createContext, useState } from 'react'
import { Store } from 'src/types/store.type'
// import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS, getStoreFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  currentStore: Store | null
  setCurrentStore: React.Dispatch<React.SetStateAction<Store | null>>
  //   extendedPurchases: ExtendedPurchase[]
  //   setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  currentStore: getStoreFromLS(),
  setCurrentStore: () => null,
  //   extendedPurchases: [],
  //   setExtendedPurchases: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  //   const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [currentStore, setCurrentStore] = useState<Store | null>(initialAppContext.currentStore)

  const reset = () => {
    setIsAuthenticated(false)
    // setExtendedPurchases([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        currentStore,
        setCurrentStore,
        // extendedPurchases,
        // setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
