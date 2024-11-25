import { create } from 'zustand'

const useTokenStore = create((set) => ({
  sessionId: null,
  setSessionId: (id) => set({ sessionId: id }),
  clearSessionId: () => set({ sessionId: null }),
}))

export default useTokenStore
