<script setup lang="ts">
import { useTheme } from '@/hooks/use-theme'

const emit = defineEmits<{
  (e: 'listUpdate', choice: number): void
}>()
const { isDark } = useTheme()
const navItems = [
  {
    text: '镜像源列表',
    onClick: () => emit('listUpdate', 1),
  },
  {
    text: '反向代理列表',
    onClick: () => emit('listUpdate', 2),
  },
  {
    text: 'Git镜像列表',
    onClick: () => emit('listUpdate', 3),
  },
  {
    text: '系统状态',
    href: '/status.html',
    target: '_blank',
  },
  {
    text: '使用帮助',
    href: 'https://help.mirrors.cqupt.edu.cn',
  },
]

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <div class="flex justify-between items-end shadow-violet md:flex-col md:items-center">
    <div class="flex items-end justify-center sm:flex-wrap">
      <img
        class="h-60px mr-10px sm:mr-0"
        alt="logo"
        src="../assets/oss-logo.svg"
      >
      <div>
        <h2 class="mt-10px mb-0 font-bold">
          重庆邮电大学开源镜像站
        </h2>
      </div>
    </div>

    <div class="flex items-center md:mt-24px">
      <nav class="text-center">
        <a
          v-for="(item, index) in navItems"
          :key="index"
          class="text-base mx-5 text-[#666] hover:text-blue-500 transition-colors cursor-pointer inline-block"
          :href="item.href"
          :target="item.target"
          @click="item.onClick && item.onClick()"
        >
          {{ item.text }}
        </a>
      </nav>
      <div
        class="ml-5 cursor-pointer text-[#666] hover:text-blue-500 transition-colors"
        @click="toggleTheme"
      >
        <div :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" class="text-xl" />
      </div>
    </div>
  </div>
</template>
