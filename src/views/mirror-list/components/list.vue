<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NButtonGroup, NInput } from 'naive-ui'
import { useAsyncState } from '@vueuse/core'
import MirrorCard from './MirrorCard.vue'
import { fetchMirrors } from '@/api/mirrors'
import type { MirrorItem } from '@/api/mirrors'

const { state, isLoading, error } = useAsyncState<MirrorItem[]>(
  fetchMirrors,
  [],
  { immediate: true },
)

// 筛选条件
const searchQuery = ref('')
const selectedType = ref('all')

// 类型选项
const typeOptions = [
  { label: '全部', value: 'all' },
  { label: '镜像', value: 'mirror' },
  { label: '代理', value: 'proxy' },
  { label: 'Git', value: 'git' },
]

// 过滤后的镜像列表
const filteredMirrors = computed(() => {
  if (!state.value)
    return []

  return state.value.filter((mirror) => {
    const matchType = selectedType.value === 'all' || mirror.type === selectedType.value
    const query = searchQuery.value.toLowerCase()
    const matchSearch = !query
      || mirror.alias.toLowerCase().includes(query)
      || mirror.desc?.toLowerCase().includes(query)

    return matchType && matchSearch
  })
})
</script>

<template>
  <div class="h-full p-3 sm:p-2">
    <!-- 筛选栏 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#e5e7eb] dark:border-[#2d2d30]">
      <!-- 类型筛选按钮组 -->
      <div class="flex items-center">
        <NButtonGroup size="small">
          <NButton
            v-for="option in typeOptions"
            :key="option.value"
            :type="selectedType === option.value ? 'primary' : 'default'"
            :ghost="selectedType !== option.value"
            class="filter-btn"
            @click="selectedType = option.value"
          >
            {{ option.label }}
          </NButton>
        </NButtonGroup>
      </div>

      <!-- 搜索框 -->
      <div class="w-full sm:w-[280px]">
        <NInput
          v-model:value="searchQuery"
          type="text"
          placeholder="搜索镜像..."
          class="search-input"
        >
          <template #prefix>
            <div class="i-carbon-search text-base opacity-50" />
          </template>
        </NInput>
      </div>
    </div>

    <!-- 镜像列表 -->
    <div>
      <div class="grid gap-3 sm:gap-4">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="col-span-full flex flex-col items-center justify-center py-8 sm:py-12">
          <div class="i-carbon-circle-dash animate-spin text-2xl sm:text-3xl text-blue-500 mb-2" />
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            加载中...
          </p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="col-span-full flex flex-col items-center justify-center py-8 sm:py-12">
          <div class="i-carbon-warning-alt text-2xl sm:text-3xl text-red-500 mb-2" />
          <p class="text-sm sm:text-base text-red-600 dark:text-red-400">
            加载失败，请稍后重试
          </p>
          <p class="text-xs sm:text-sm text-red-400 mt-2">
            {{ error }}
          </p>
        </div>

        <!-- 空状态 -->
        <div v-else-if="filteredMirrors.length === 0" class="col-span-full flex flex-col items-center justify-center py-8 sm:py-12">
          <div class="i-carbon-search text-2xl sm:text-3xl text-gray-400 mb-2" />
          <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            未找到匹配的镜像
          </p>
        </div>

        <!-- 数据展示 -->
        <template v-else>
          <MirrorCard
            v-for="mirror in filteredMirrors"
            :key="mirror.id"
            :mirror="mirror"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
  gap: 1rem;
}

:deep(.search-input.n-input) {
  --n-height: 32px;
  --n-padding: 0 12px;
  --n-font-size: 14px;
  --n-border-radius: 6px;
}

:deep(.filter-btn.n-button) {
  height: 34px;
  padding: 0 12px;
  font-size: 14px;
  min-width: 56px;
}

:deep(.n-button-group .n-button:not(:last-child)) {
  margin-right: 1px;
}

@media (max-width: 640px) {
  :deep(.search-input.n-input) {
    --n-height: 32px;
    --n-padding: 0 10px;
  }

  :deep(.filter-btn.n-button) {
    height: 32px;
    padding: 0 10px;
    font-size: 13px;
    min-width: 52px;
  }
}

@media (min-width: 640px) {
  :deep(.search-input.n-input) {
    --n-height: 34px;
    --n-padding: 0 14px;
  }
}
</style>
