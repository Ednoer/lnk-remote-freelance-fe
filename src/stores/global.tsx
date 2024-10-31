import { LoginResponse } from '@/layouts/auth/interface'
import create from 'zustand'

interface StoreGlobal {
    profile?: LoginResponse
    setProfile: (profile: LoginResponse) => void
}

const useStoreGlobal = create<StoreGlobal>((set) => ({
    profile: undefined,
    setProfile: (profile) => set(() => ({profile}))
}))

export default useStoreGlobal
