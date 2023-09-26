import { onMounted, Ref, ref } from 'vue'
import axios from 'axios'

interface News {
  title: string
  content: string
}

export function useNews () {
  const news: Ref<News[]> = ref([])
  onMounted(async () => {
    const res = await axios.get(`/api/news`)
    news.value = res.data
  })
  const newsContent = ref('详细内容')
  const newsModal = ref(false)

  const openModal = (title: string) => {
    newsContent.value = news.value.find(item => item.title === title)!.content
    newsModal.value = true
  }
  const closeModal = () => {
    newsModal.value = false
  }
  return { news, newsContent, newsModal, openModal, closeModal }
}
