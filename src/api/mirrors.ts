import { createApiClient } from './core/apiClient'

export interface MirrorItem {
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

const apiClient = createApiClient('')

export async function fetchMirrors(): Promise<MirrorItem[]> {
  const response = await apiClient.get<MirrorItem[]>('/api/mirrors')
  return response
}
