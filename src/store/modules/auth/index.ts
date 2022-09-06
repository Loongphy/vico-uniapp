import type { AuthState } from './types'
import type { LoginReqParams } from '@/api/auth/types'
import { login, logout } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
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
      uni.getStorage({
        key: 'token',
        success: (res) => {
          this.token = res.data
        },
      })
    },
    setToken(token: string) {
      uni.setStorage({ key: 'token', data: token })
      this.token = token
    },
    clearToken() {
      uni.removeStorage({ key: 'token' })
      this.token = ''
    },
    async login(params: LoginReqParams) {
      try {
        const { data } = await login(params)
        this.setToken(data.token)
        uni.navigateTo({ url: '/pages/index/index' })
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
        uni.navigateTo({ url: '/pages/login/index' })
      }
    },
  },
})
