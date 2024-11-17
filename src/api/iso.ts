import { createApiClient } from './core/apiClient'
import type { IsoDistro } from '@/types/iso'

const apiClient = createApiClient('')

export function getIsoList(): Promise<IsoDistro[]> {
  return apiClient.get<IsoDistro[]>('/api/files')
}
