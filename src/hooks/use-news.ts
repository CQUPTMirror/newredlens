import { ref } from 'vue'

interface NewsItem {
  title: string
  content: string
}

export function useNews() {
  const newsModal = ref(false)
  const newsContent = ref('')
  const news = ref<NewsItem[]>([])

  const openModal = (title: string) => {
    const item = news.value.find(n => n.title === title)
    if (item) {
      newsContent.value = item.content
      newsModal.value = true
    }
  }

  const closeModal = () => {
    newsModal.value = false
  }

  return {
    news,
    newsModal,
    newsContent,
    openModal,
    closeModal
  }
}
