import { ref } from 'vue'

export function useIsoModal () {
  const modalVisible = ref(false)
  const categoryActiveKey = ref('操作系统')
  const itemActiveKey = ref('Arch Linux')
  const handleOk = e => {
    modalVisible.value = false
  }
  return {
    modalVisible,
    categoryActiveKey,
    itemActiveKey,
    handleOk
  }
}
