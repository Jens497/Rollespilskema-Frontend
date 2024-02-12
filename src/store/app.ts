// Utilities
import useBackend from '@/composables/useBackend'
import { defineStore } from 'pinia'

interface State {
  _user?: {
    username: string,
    firstName: string,
    roles: string[]
  },
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    _user: undefined
  }),
  getters: {
    isLoggedIn: async (state) => state._user != undefined || (await useBackend().get("/auth/isLoggedIn")).data,
    getUserAsync: async (state) => {
      state._user ??= (await useBackend().get("/user/Me")).data;
      return state._user;
    }
  },
  persist: {
    storage: sessionStorage
  }
})
