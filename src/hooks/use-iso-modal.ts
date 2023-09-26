import { onMounted, Ref, ref, watch, toRaw } from 'vue'
import axios from 'axios'
import { FileItem } from '@/types/FileItem'

export function useIsoModal () {
  const info = ref({})
  onMounted(async () => {
    const res = await axios.get(`/api/files`)
    const data: FileItem[] = res.data
    const os: Record<string, FileItem> = {}
    const app: Record<string, FileItem> = {}
    for (const item of data) {
      switch (item.type) {
        case 'os':
          os[item.id] = item
          break
        case 'app':
          app[item.id] = item
          break
        default:
          break
      }
    }
    info.value = { os, app }
  })
  const modalVisible = ref(false)
  const categoryActiveKey = ref('os')
  const itemActiveKey = ref('')
  watch(categoryActiveKey, () => {
    const detail = toRaw(info.value[categoryActiveKey.value])
    if (Object.getOwnPropertyNames(detail).length > 0) {
      itemActiveKey.value = Object.getOwnPropertyNames(detail)[0]
    }
  })
  const handleOk = e => {
    modalVisible.value = false
  }
  return {
    info,
    modalVisible,
    categoryActiveKey,
    itemActiveKey,
    handleOk
  }
}
