import { ref, reactive } from 'vue'

interface IsoInfo {
  [category: string]: {
    [key: string]: {
      id: string
      alias?: string
      files: Array<{
        name: string
        path: string
      }>
    }
  }
}

export function useIsoModal() {
  const modalVisible = ref(false)
  const categoryActiveKey = ref('os')
  const itemActiveKey = ref('')
  const info = reactive<IsoInfo>({})

  const handleOk = () => {
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
