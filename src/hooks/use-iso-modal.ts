import { onMounted, Ref, ref, watch, toRaw } from 'vue'
import axios from 'axios'

export function useIsoModal () {
  const info = ref({})
  onMounted(async () => {
    const res = await axios.get(`/static/isoinfo.json`)
    info.value = res.data
  })
  const modalVisible = ref(false)
  const categoryActiveKey = ref('操作系统')
  const itemActiveKey = ref('Arch Linux')
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
