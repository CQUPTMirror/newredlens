<script setup lang="ts">
import { computed, ref } from 'vue'
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

const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <NConfigProvider :theme="themeConfig">
    <NMessageProvider>
      <NNotificationProvider>
        <div class="min-h-screen flex flex-col">
          <div class="container mx-auto px-4 lg:px-8">
            <!-- Header -->
            <Header @toggle-sidebar="toggleSidebar" />

            <!-- 主要内容区域 -->
            <div class="lg:flex gap-8 relative lg:py-6 sm:py-2">
              <!-- 主内容区 -->
              <main class="flex-1 min-w-0">
                <MirrorList />
              </main>

              <!-- 桌面端侧边栏 -->
              <aside class="w-[300px] hidden lg:block shrink-0">
                <div class="bg-white dark:bg-dark rounded-xl shadow-sm dark:shadow-md p-4 sticky top-6">
                  <Sidebar />
                </div>
              </aside>

              <!-- 移动端侧边栏遮罩 -->
              <div
                v-if="showSidebar"
                class="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                @click="toggleSidebar"
              />

              <!-- 移动端侧边栏 -->
              <aside
                class="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-dark shadow-xl transform transition-transform duration-300 z-50 lg:hidden overflow-y-auto"
                :class="showSidebar ? 'translate-x-0' : 'translate-x-full'"
              >
                <!-- 侧边栏头部 -->
                <div class="sticky top-0 z-10 bg-white dark:bg-dark border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
                  <span class="text-base font-medium text-gray-900 dark:text-gray-100">功能菜单</span>
                  <div
                    class="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    @click="toggleSidebar"
                  >
                    <div class="i-carbon-close text-base text-gray-600 dark:text-gray-400" />
                  </div>
                </div>

                <!-- 侧边栏内容 -->
                <div class="px-4 py-3">
                  <Sidebar />
                </div>
              </aside>
            </div>

            <!-- Footer -->
            <Footer />
          </div>
        </div>
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style>
:root {
  --header-height: 112px;
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
  background-color: #22c55e;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

a:hover::after {
  width: 100%;
}

.dark a::after {
  background-color: #4ade80;
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
  background: #cbd5e1;
  border-radius: 6px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #334155;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* 容器最大宽度响应式 */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .container {
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1400px;
  }
}

/* 优化滚动条过渡效果 */
::-webkit-scrollbar-thumb {
  transition: background-color 0.5s ease;
}

/* 优化链接下划线过渡效果 */
a::after {
  transition: all 0.5s ease;
}

@keyframes theme-toggle-ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  100% {
    width: 400vmax;
    height: 400vmax;
    opacity: 0;
  }
}

/* 设置深色模式下的动画颜色 */
html.dark {
  --ripple-color: rgba(34, 197, 94, 0.15);
}

/* 防止动画期间出现闪烁 */
.theme-toggle-ripple ~ * {
  transition: none !important;
}

/* 确保所有内容都在容器内 */
* {
  max-width: 100%;
}

/* 防止图片溢出 */
img {
  max-width: 100%;
  height: auto;
}
</style>
