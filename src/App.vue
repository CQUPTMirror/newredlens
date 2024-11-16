<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider, NMessageProvider, NNotificationProvider, darkTheme, lightTheme } from 'naive-ui'
import { useTheme } from '@/hooks/use-theme'
import Footer from '@/views/Footer.vue'
import Header from '@/views/Header.vue'
import MirrorList from '@/views/mirror-list/index.vue'
import Sidebar from '@/views/sidebar/index.vue'

const { isDark } = useTheme()

const themeConfig = computed(() =>
  isDark.value ? darkTheme : lightTheme,
)
</script>

<template>
  <NConfigProvider :theme="themeConfig">
    <NMessageProvider>
      <NNotificationProvider>
        <div class="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-[#18181c]">
          <Header />
          <div class="flex-1 container mx-auto flex gap-6 px-6" style="height: calc(100vh - var(--header-height) - var(--footer-height))">
            <main class="flex-1 rounded-xl shadow-sm my-6">
              <MirrorList />
            </main>
            <aside class="w-80 my-6">
              <Sidebar />
            </aside>
          </div>
          <Footer />
        </div>
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style>
:root {
  --header-height: 64px;
  --footer-height: 64px;
}

/* 全局链接样式 */
a {
  text-decoration: none;
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1px;
  background-color: #3b82f6;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

a:hover::after {
  width: 100%;
}

.no-hover-line::after {
  display: none;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* 容器最大宽度响应式 */
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
</style>
