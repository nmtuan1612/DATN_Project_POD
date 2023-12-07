import { createContext, useState } from 'react'
import { ConversationMetaData } from 'src/types/chat.type'
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
  chatMetaData: ConversationMetaData
  setChatMetaData: React.Dispatch<React.SetStateAction<ConversationMetaData>>
  otp: number
  setOtp: React.Dispatch<React.SetStateAction<number>>
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
  chatMetaData: { chatID: '', otherUserId: '' },
  setChatMetaData: () => null,
  otp: 0,
  setOtp: () => null,
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
  const [chatMetaData, setChatMetaData] = useState<ConversationMetaData>(initialAppContext.chatMetaData)
  const [otp, setOtp] = useState<number>(0)

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
        chatMetaData,
        setChatMetaData,
        otp,
        setOtp,
        // extendedPurchases,
        // setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
