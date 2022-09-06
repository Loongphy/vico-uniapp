import type { AuthState } from './types'
import type { LoginReqParams } from '@/api/auth/types'
import { login, logout } from '@/api/auth'

export const useAuthState = defineStore('auth', {
  state: (): AuthState => {
    return {
      token: '',
    }
  },
  getters: {
    isLogin: (state: AuthState): boolean => {
      return !!state.token
    },
  },
  actions: {
    loadToken() {
      this.token = localStorage.getItem('token') || ''
    },
    setToken(token: string) {
      localStorage.setItem('token', token)
      this.token = token
    },
    clearToken() {
      localStorage.removeItem('token')
      this.token = ''
    },
    async login(params: LoginReqParams) {
      try {
        const { data } = await login(params)
        this.setToken(data.token)
        uni.switchTab({ url: '/pages/index/index' })
      }
      catch (err) {
        this.clearToken()
        throw err
      }
    },
    async logout() {
      try {
        await logout()
      }
      finally {
        this.clearToken()
        // uni.switchTab({ url: '/pages/login/index' })
      }
    },
  },
})
