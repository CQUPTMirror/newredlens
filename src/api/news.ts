import { createApiClient } from './core/apiClient'

export interface NewsItem {
  id: string
  title: string
  content: string
  author: string
  pubTime: number
  editTime: number
}
const apiClient = createApiClient('')

export function getNews(): Promise<NewsItem[]> {
  return apiClient.get<NewsItem[]>('/api/news')
}
