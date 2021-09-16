import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import { redirectLogin, refreshTokenException } from './auth'

const service = axios.create(config)
// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (config.url === 'api/v1/refresh') {
      const refreshToken = Cookies.get('refreshToken')
      if (refreshToken) {
        config.headers.Authorization = 'Bearer ' + refreshToken
      }
    } else {
      // 有accessToken
      const accessToken = Cookies.get('accessToken')
      if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  async err => {
    let { error } = err.response.data
    return new Promise(async (resolve, reject) => {
      const { url } = err.config

      // refreshToken相关，直接登出
      if (refreshTokenException(error.code)) {
        redirectLogin()
        return resolve(null)
      }
      // accessToken相关，刷新令牌
      if (error.code === 10041 || error.code === 10051) {
        const cache = {}
        if (cache['url'] !== url) {
          cache['url'] = url
          const refreshRes = await service.post('api/v1/refresh')
          Cookies.set('accessToken', refreshRes.data.accessToken)
          // 将上次失败请求重发
          const previousRes = await service(err.config)
          return resolve(previousRes)
        }
      }
      ElMessage({
        showClose: true,
        type: 'warning',
        message: error.message
      })
      return Promise.reject(err)
    })
  }
)

export default service
