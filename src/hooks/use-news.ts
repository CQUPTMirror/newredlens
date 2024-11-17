import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import type { NewsItem } from '@/api/news'
import { getNews } from '@/api/news'

export function useNews() {
  const isVisible = ref(false)
  const selectedNews = ref<NewsItem | null>(null)

  // 只在初始化时获取一次所有新闻数据
  const { state: newsList, isLoading } = useAsyncState<NewsItem[]>(
    () => getNews(),
    [],
    {
      immediate: true, // 组件创建时立即获取
      resetOnExecute: false, // 防止重复执行时重置状态
    },
  )

  // 直接使用已获取的新闻数据，不再发送请求
  function openNewsModal(news: NewsItem) {
    selectedNews.value = news
    isVisible.value = true
  }

  function closeNewsModal() {
    isVisible.value = false
    selectedNews.value = null
  }

  return {
    isLoading,
    isVisible,
    newsList,
    selectedNews,
    openNewsModal,
    closeNewsModal,
  }
}
