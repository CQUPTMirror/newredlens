<script setup lang="ts">
import { computed } from 'vue'
import type { MirrorItem } from '@/api/mirrors'
import { getIconClass } from '@/config/icons'

const props = defineProps<{
  mirror: MirrorItem
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const iconClass = computed(() => getIconClass(props.mirror.id))

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

function handleClick(e: MouseEvent) {
  emit('click')
  if (!props.mirror.url && !props.mirror.id) {
    e.preventDefault()
  }
}
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg transition-all duration-300 w-full"
    :class="selected ? 'card-selected' : 'hover:shadow-md'"
  >
    <a
      :href="mirror.url || `/${mirror.id}/`"
      class="block bg-white dark:bg-gray-800 rounded-md transition-all duration-300 group no-hover-line cursor-pointer w-full"
      :class="selected ? 'shadow-gray-200 dark:shadow-gray-700' : 'shadow hover:shadow-gray-200 hover:shadow-lg dark:hover:shadow-gray-700'"
      @click.stop="handleClick"
    >
      <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 flex items-center justify-center transition-transform duration-300"
              :class="selected ? 'scale-140' : 'group-hover:scale-125'"
            >
              <span :class="iconClass" />
            </div>
            <h3
              class="text-lg font-semibold transition-all duration-300 origin-left"
              :class="selected ? 'text-primary scale-120' : 'text-gray-900 dark:text-white group-hover:text-primary group-hover:scale-115'"
            >
              {{ mirror.alias }}
            </h3>
          </div>
          <div class="px-2 py-0.5 rounded-full text-sm font-medium" :class="getStatusColor(mirror.status)">
            {{ getStatusText(mirror.status) }}
          </div>
        </div>
      </div>

      <div class="px-4 py-2 min-h-[56px] flex flex-col justify-between">
        <div class="flex items-start justify-between w-full">
          <div class="px-2 py-0.5 rounded text-sm font-medium shrink-0" :class="getTypeColor(mirror.type)">
            {{ getTypeText(mirror.type) }}
          </div>
          <div class="flex-1 ml-3 min-w-0">
            <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 text-right h-[1.25rem] break-all">
              {{ mirror.desc }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm mt-1.5 w-full">
          <div class="flex items-center gap-1 min-w-0">
            <span class="text-gray-500 dark:text-gray-400 whitespace-nowrap">大小：</span>
            <span class="text-gray-700 dark:text-gray-200 truncate">{{ mirror.sizeStr }}</span>
          </div>
          <div class="flex items-center gap-1 min-w-0">
            <span class="text-gray-500 dark:text-gray-400 whitespace-nowrap">更新于：</span>
            <span class="text-gray-700 dark:text-gray-200 truncate">{{ formatTime(mirror.lastUpdate) }}</span>
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
  </div>
</template>

<style lang="uno">
.card-selected {
  @apply ring-2 ring-primary shadow-gray-200 dark:shadow-gray-700;
}
</style>
