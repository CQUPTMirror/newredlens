import { type AxiosResponse } from 'axios'
import apiClient from './apiClient'

interface LoginResp {
  accessToken: string
  refreshToken: string
}

class Admin {
  login (params: { username: string, password: string }): Promise<AxiosResponse<LoginResp>> {
    return apiClient.post('/api/v1/login', params)
  }
}

const AdminApi = new Admin()

export {
  type LoginResp,
  AdminApi
}
