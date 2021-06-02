import service from '@/utils/api'

interface LoginResp {
  accessToken: string,
  refreshToken: string
}

class Admin {
  login (params: { username: string, password: string }): Ajax.PromiseAxiosResponse<LoginResp> {
    return service.post(`/api/v1/login`, params)
  }
}

const AdminApi = new Admin()

export {
  LoginResp,
  AdminApi
}
