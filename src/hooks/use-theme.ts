/**
 * 主题切换 hook
 * - 自动跟随系统主题
 * - 根据时间自动切换（晚6点到早6点为夜间模式）
 * - 支持手动切换并记住用户偏好
 */

import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

const DARK_CLASS = 'dark'
const NIGHT_START_HOUR = 18
const NIGHT_END_HOUR = 6
const THEME_STORAGE_KEY = 'theme-preference'

const preferredDark = usePreferredDark()

function isNightTime(): boolean {
  const hour = new Date().getHours()
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR
}

function updateDarkClass(isDarkMode: boolean): void {
  const action = isDarkMode ? 'add' : 'remove'
  document.documentElement.classList[action](DARK_CLASS)
}

function getSavedTheme(): boolean | null {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  return saved ? JSON.parse(saved) : null
}

function saveTheme(isDarkMode: boolean): void {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode))
}

function getInitialTheme(): boolean {
  const savedTheme = getSavedTheme()
  if (savedTheme !== null)
    return savedTheme
  return preferredDark.value || isNightTime()
}

const initialTheme = getInitialTheme()
updateDarkClass(initialTheme)

const isDark = ref(initialTheme)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    saveTheme(isDark.value)
  }

  watch(preferredDark, (newValue) => {
    if (getSavedTheme() === null)
      isDark.value = newValue || isNightTime()
  })

  watch(isDark, (newValue) => {
    updateDarkClass(newValue)
    saveTheme(newValue)
  }, { immediate: true })

  return {
    isDark,
    toggleTheme,
  }
}
