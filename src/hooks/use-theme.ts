import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

const isDark = ref(usePreferredDark().value)

export function useTheme() {
  watch(isDark, (newValue) => {
    // 更新 HTML 根元素的 class
    if (newValue) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })

  return {
    isDark,
  }
}
