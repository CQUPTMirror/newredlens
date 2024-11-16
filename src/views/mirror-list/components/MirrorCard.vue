<script setup lang="ts">
import { computed } from 'vue'
import type { MirrorItem } from '@/api/mirrors'
import Icon from '@/components/icon.vue'
import { getIconClass } from '@/config/icons'

const props = defineProps<{
  mirror: MirrorItem
}>()

const iconClass = computed(() => {
  const cls = getIconClass(props.mirror.id)
  return cls
})

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'success':
      return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
    case 'syncing':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
    case 'failed':
      return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
    case 'cached':
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'mirror':
      return 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
    case 'proxy':
      return 'bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300'
    case 'git':
      return 'bg-green-50 text-green-600 dark:bg-green-900/50 dark:text-green-300'
    default:
      return 'bg-gray-50 text-gray-600 dark:bg-gray-900/50 dark:text-gray-300'
  }
}

function getTypeText(type: string) {
  const typeMap: Record<string, string> = {
    mirror: '镜像',
    proxy: '代理',
    git: 'Git',
  }
  return typeMap[type] || type
}

function getStatusText(status: string) {
  const statusMap: Record<string, string> = {
    success: '同步成功',
    syncing: '同步中',
    failed: '同步失败',
    cached: '已缓存',
  }
  return statusMap[status.toLowerCase()] || status
}

function formatTime(timestamp: number): string {
  if (!timestamp)
    return '未知'
  return new Date(timestamp * 1000).toLocaleString()
}
</script>

<template>
  <a
    :href="mirror.url || `/${mirror.id}/`"
    class="block bg-white dark:bg-gray-800 rounded-md shadow transition-all duration-300 group no-hover-line hover:shadow-primary/20 hover:shadow-lg dark:hover:shadow-primary/10"
  >
    <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Icon :name="iconClass" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white transition-colors group-hover:text-primary">
            {{ mirror.alias }}
          </h3>
        </div>
        <div class="px-2 py-1 rounded-full text-sm font-medium" :class="getStatusColor(mirror.status)">
          {{ getStatusText(mirror.status) }}
        </div>
      </div>
    </div>

    <div class="px-4 py-3 min-h-[64px] flex flex-col justify-between">
      <div class="flex items-start justify-between">
        <div class="px-2 py-1 rounded text-sm font-medium shrink-0" :class="getTypeColor(mirror.type)">
          {{ getTypeText(mirror.type) }}
        </div>
        <p
          v-if="mirror.desc"
          class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 text-right flex-1 ml-3"
        >
          {{ mirror.desc }}
        </p>
      </div>

      <div class="flex items-center justify-between text-sm mt-2">
        <div class="flex items-center gap-1">
          <span class="text-gray-500 dark:text-gray-400">大小：</span>
          <span class="text-gray-700 dark:text-gray-200">{{ mirror.sizeStr }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-gray-500 dark:text-gray-400">更新于：</span>
          <span class="text-gray-700 dark:text-gray-200">{{ formatTime(mirror.lastUpdate) }}</span>
        </div>
      </div>
    </div>

    <div class="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-b-md">
      <div class="flex justify-end items-center">
        <a
          v-if="mirror.helpUrl"
          :href="`https://help.mirrors.cqupt.edu.cn/${mirror.helpUrl}/?mirror=CQUPT`"
          target="_blank"
          class="inline-flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 no-hover-line"
          @click.stop
        >
          <span>使用帮助</span>
          <div class="i-carbon-document text-base" />
        </a>
        <span v-else class="text-sm text-gray-400">暂无帮助文档</span>
      </div>
    </div>
  </a>
</template>

<style scoped>
:root {
  --primary-color: #3eaf7c;
}
</style>
