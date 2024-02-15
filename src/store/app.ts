// Utilities
import useBackend from '@/composables/useBackend'
import { computedAsync, useAsyncState } from '@vueuse/core'
import { defineStore } from 'pinia'

interface State {
  _user?: {
    username: string,
    firstName: string,
    roles: string[]
  },
  _isLoggedIn?: boolean
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    _user: undefined,
    _isLoggedIn: undefined,
  }),
  actions: {
    async getIsLoggedIn(): Promise<boolean> {
      let isLoggedIn: boolean = this._isLoggedIn ?? false
      isLoggedIn = await useBackend().get("/auth/isLoggedIn")
        .then(response => response.data)
        .catch(reason => {
          console.warn("AxiosError: Failed to get isLoggedIn status: ", reason)
          return isLoggedIn
        })

      if (!isLoggedIn) {
        this._user = undefined
      }

      this._isLoggedIn = isLoggedIn
      return isLoggedIn;
    },
    async getUserAsync(): Promise<State["_user"] | undefined> {
      const isLoggedIn = await this.getIsLoggedIn()

      if (!isLoggedIn) {
        this._user = undefined
        return this._user;
      }

      this._user ??= (await useBackend().get("/user/me")).data;

      return this._user;
    }
  },
  persist: {
    storage: sessionStorage
  }
})
