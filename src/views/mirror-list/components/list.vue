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
  {
    immediate: true,
  },
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
    // 类型筛选
    const matchType = selectedType.value === 'all' || mirror.type === selectedType.value
    // 搜索筛选
    const query = searchQuery.value.toLowerCase()
    const matchSearch = !query
      || mirror.alias.toLowerCase().includes(query)
      || mirror.desc?.toLowerCase().includes(query)

    return matchType && matchSearch
  })
})
</script>

<template>
  <div>
    <!-- 筛选栏 -->
    <div class="mb-4 px-4">
      <div class="flex items-center justify-between">
        <!-- 类型筛选按钮组 -->
        <NButtonGroup>
          <NButton
            v-for="option in typeOptions"
            :key="option.value"
            size="small"
            :type="selectedType === option.value ? 'primary' : 'default'"
            :ghost="selectedType !== option.value"
            @click="selectedType = option.value"
          >
            {{ option.label }}
          </NButton>
        </NButtonGroup>

        <!-- 搜索框 -->
        <NInput
          v-model:value="searchQuery"
          type="text"
          placeholder="搜索镜像..."
          class="!w-70"
        >
          <template #prefix>
            <div class="i-carbon-search text-lg opacity-50" />
          </template>
        </NInput>
      </div>
    </div>

    <!-- 镜像列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="col-span-full text-center py-8">
        <div class="i-carbon-circle-dash animate-spin text-3xl text-blue-500 mx-auto mb-2" />
        <p class="text-gray-600 dark:text-gray-400">
          加载中...
        </p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="col-span-full text-center py-8">
        <div class="i-carbon-warning-alt text-3xl text-red-500 mx-auto mb-2" />
        <p class="text-red-600 dark:text-red-400">
          加载失败，请稍后重试
        </p>
        <p class="text-sm text-red-400 mt-2">
          {{ error }}
        </p>
      </div>

      <!-- 空状态 -->
      <div v-else-if="filteredMirrors.length === 0" class="col-span-full text-center py-8">
        <div class="i-carbon-search text-3xl text-gray-400 mx-auto mb-2" />
        <p class="text-gray-500 dark:text-gray-400">
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
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

:deep(.n-input) {
  --n-height: 32px;
}

:deep(.n-button) {
  padding: 0 16px;
}

:deep(.n-button-group .n-button:not(:last-child)) {
  margin-right: 1px;
}
</style>
