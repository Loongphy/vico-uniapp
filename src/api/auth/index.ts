import type { LoginReqParams, LoginRespModel } from './types'
import { http } from '@/utils/http'

export function login(params: LoginReqParams) {
  return http.post<LoginRespModel>('/login', params, {
    // 登录接口不鉴权
    custom: { auth: false },
  })
}

export function logout() {
  return http.post('/logout', undefined, {
    custom: { auth: false },
  })
}
