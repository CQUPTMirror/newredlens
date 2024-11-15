import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import config from '../utils/config'
import { message } from 'ant-design-vue'
import { redirectLogin, refreshTokenException } from '../utils/auth'
import { TokenManager } from '../utils/token-manager'

// 创建请求实例
const instance: AxiosInstance = axios.create(config)

// 刷新token相关状态
let isRefreshing = false
const refreshSubscribers: Array<(token: string) => void> = []

// 处理请求配置
const handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const isRefreshRequest = config.url === 'api/v1/refresh'
  const token = isRefreshRequest 
    ? TokenManager.getRefreshToken()
    : TokenManager.getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// 处理token刷新
const handleTokenRefresh = async (failedRequest: AxiosRequestConfig): Promise<any> => {
  if (!isRefreshing) {
    isRefreshing = true
    try {
      const response = await instance.post('api/v1/refresh')
      const { accessToken } = response.data
      TokenManager.setAccessToken(accessToken)
      isRefreshing = false
      // 通知所有等待的请求
      refreshSubscribers.forEach(callback => callback(accessToken))
      refreshSubscribers.length = 0
      return instance(failedRequest)
    } catch (error) {
      isRefreshing = false
      TokenManager.clearTokens()
      redirectLogin()
      return null
    }
  }

  // 将请求加入队列
  return new Promise((resolve) => {
    refreshSubscribers.push((token: string) => {
      if (failedRequest.headers) {
        failedRequest.headers.Authorization = `Bearer ${token}`
      }
      resolve(instance(failedRequest))
    })
  })
}

// 处理错误响应
const handleError = async (error: any): Promise<any> => {
  if (!error.response?.data?.error) {
    message.error('网络错误')
    return Promise.reject(error)
  }

  const { error: apiError } = error.response.data
  const { config: failedRequest } = error

  // 处理 refreshToken 相关错误
  if (refreshTokenException(apiError.code)) {
    TokenManager.clearTokens()
    redirectLogin()
    return null
  }

  // 处理 accessToken 过期
  if (apiError.code === 10041 || apiError.code === 10051) {
    return handleTokenRefresh(failedRequest)
  }

  message.warning({
    content: apiError.message,
    duration: 3
  })
  return Promise.reject(error)
}

// 设置拦截器
instance.interceptors.request.use(handleRequest, error => Promise.reject(error))
instance.interceptors.response.use(
  response => response.data,
  handleError
)

// API 方法
const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request(config)
}

const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return instance.get(url, config)
}

const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return instance.post(url, data, config)
}

export default {
  request,
  get,
  post
}
