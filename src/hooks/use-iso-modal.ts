import { onMounted, Ref, ref } from 'vue'
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
