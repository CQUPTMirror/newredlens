<script setup lang="ts">
import { NMenu } from 'naive-ui'
import { useTheme } from '@/hooks/use-theme'
import { navItems } from '@/config/nav'

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="h-auto lg:h-28 border-b border-gray-200 dark:border-gray-800">
    <div class="h-full">
      <!-- 移动端布局 -->
      <div class="lg:hidden flex flex-col py-4">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <img
              class="h-9 w-auto"
              alt="CQUPT Logo"
              src="../assets/oss-logo.svg"
            >
            <div class="flex flex-col">
              <h1 class="text-lg font-medium text-gray-900 dark:text-gray-50">
                重庆邮电大学开源镜像站
              </h1>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="toggleTheme"
            >
              <div :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" class="text-base text-gray-600 dark:text-gray-300" />
            </div>
            <div
              class="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="emit('toggleSidebar')"
            >
              <div class="i-carbon-menu text-base text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <NMenu
            mode="horizontal"
            :options="navItems"
            class="min-w-max"
            :inline-theme="false"
            :inverted="isDark"
          />
        </div>
      </div>

      <!-- 桌面端布局 -->
      <div class="hidden lg:flex h-full items-center justify-between">
        <div class="flex items-center gap-6">
          <img
            class="h-12 w-auto"
            alt="CQUPT OSS Logo"
            src="../assets/oss-logo.svg"
          >
          <div class="flex items-center">
            <h1 class="text-2xl font-medium text-gray-900 dark:text-gray-50">
              重庆邮电大学开源镜像站
            </h1>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <NMenu
            mode="horizontal"
            :options="navItems"
            class="min-w-[320px] text-base"
            :inline-theme="false"
            :inverted="isDark"
          />
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="toggleTheme"
          >
            <div :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" class="text-lg text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
