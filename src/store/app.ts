// Utilities
import { defineStore } from 'pinia'

interface State {
  user?: {
    username: string,
    firstName: string,
    roles: string[]
  },
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    user: undefined
  }),
  getters: {
    isLoggedIn: (state) => state.user != undefined
  }
})
