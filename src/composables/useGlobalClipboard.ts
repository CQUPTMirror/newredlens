import { useClipboard } from '@vueuse/core'
import { message } from 'ant-design-vue'

export function useGlobalClipboard() {
  const { copy, copied } = useClipboard()

  const copyText = async (text: string) => {
    await copy(text)
    if (copied.value) {
      message.success('复制成功')
    } else {
      message.error('复制失败')
    }
  }

  return {
    copyText
  }
} 