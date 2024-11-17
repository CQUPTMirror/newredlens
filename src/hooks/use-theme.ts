import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

const preferredDark = usePreferredDark()
const isDark = ref(preferredDark.value)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (newValue) => {
    if (newValue)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }, { immediate: true })

  return {
    isDark,
    toggleTheme,
  }
}
