import Cookies from 'js-cookie'

export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken'
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken'

  static getAccessToken(): string | undefined {
    return Cookies.get(this.ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(this.REFRESH_TOKEN_KEY)
  }

  static setAccessToken(token: string): void {
    Cookies.set(this.ACCESS_TOKEN_KEY, token)
  }

  static clearTokens(): void {
    Cookies.remove(this.ACCESS_TOKEN_KEY)
    Cookies.remove(this.REFRESH_TOKEN_KEY)
  }
} 