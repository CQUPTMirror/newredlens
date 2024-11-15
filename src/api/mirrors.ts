import { createApiClient } from './core/apiClient'

interface MirrorItem {
  id: string
  alias: string
  desc: string
  url: string
  helpUrl: string
  type: 'mirror' | 'proxy' | 'git'
  sizeStr: string
  status: 'success' | 'syncing' | 'cached' | string
  lastUpdate: number
  lastStarted: number
  lastEnded: number
  nextSchedule: number
  upstream: string
  size: number
  errorMsg: string
  lastOnline: number
  lastRegister: number
}

interface MirrorResponse {
  mirrors: MirrorItem[]
  proxies: MirrorItem[]
  gits: MirrorItem[]
}

const apiClient = createApiClient('')

export function fetchMirrors(): Promise<MirrorResponse> {
  return apiClient.get<MirrorResponse>('/api/mirrors')
}
