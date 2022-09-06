import Request from 'luch-request'

export const http = new Request({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  dataType: 'json',
  custom: {
    auth: true,
  },
})

// 请求拦截器
http.interceptors.request.use((config) => {
  // 登录拦截
  if (config.custom?.auth) {
    let token = ''
    uni.getStorage({
      key: 'storage_key',
      success(res) {
        token = res.data
      },
    })
    if (token) {
      if (!config.header)
        config.header = {}
      config.header.token = `${token}`
    }
    else {
      uni.showToast({ title: '请先登录', icon: 'none' })
      return Promise.reject(config)
    }
  }
  return config
}, (config) => {
  return Promise.reject(config)
})

// 响应拦截器
http.interceptors.response.use(({ data }) => {
  // 统一返回格式为：{code:'',data:'',message:''}，若您的返回格式不同，需要手动调整
  const { code, message } = data
  if (code === 0)
    return data
  else uni.showToast({ title: message, icon: 'error' })
}, (response) => {
  // 请求错误，可根据response.statusCode处理
  return Promise.reject(response)
})
