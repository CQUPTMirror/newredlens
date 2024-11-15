<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider, NNotificationProvider, darkTheme, lightTheme } from 'naive-ui'
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
    <NNotificationProvider>
      <div class="min-h-screen w-full flex flex-col bg-white dark:bg-[#18181c]">
        <Header />
        <div class="flex-1 flex w-full">
          <main class="flex-1 overflow-y-auto">
            <MirrorList />
          </main>
          <aside class="w-80 border-l border-[#eee] dark:border-[#252525] flex-shrink-0 px-14">
            <Sidebar />
          </aside>
        </div>
        <Footer />
      </div>
    </NNotificationProvider>
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
</style>
