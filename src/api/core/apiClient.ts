import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export interface ApiResponse<T = any> {
  data: T
  message?: string
  status?: number
}

export interface ApiClient {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
}

export function createApiClient(baseURL: string, config: AxiosRequestConfig = {}): ApiClient {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  })

  // 设置拦截器
  setupInterceptors(axiosInstance)

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      makeRequest<T>(axiosInstance.get(url, config)),
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      makeRequest<T>(axiosInstance.post(url, data, config)),
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      makeRequest<T>(axiosInstance.put(url, data, config)),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      makeRequest<T>(axiosInstance.delete(url, config)),
  }
}

function setupInterceptors(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    response => response,
    (error) => {
      console.error('API请求错误:', error)
      return Promise.reject(new Error(error.response?.data?.message || '网络请求失败'))
    },
  )
}

async function makeRequest<T>(request: Promise<AxiosResponse>): Promise<T> {
  const response = await request
  return extractData<T>(response.data)
}

function extractData<T>(response: ApiResponse<T> | T): T {
  if (isApiResponse(response)) {
    return response.data
  }
  return response
}

function isApiResponse<T>(response: any): response is ApiResponse<T> {
  return response && typeof response === 'object' && 'data' in response
}
