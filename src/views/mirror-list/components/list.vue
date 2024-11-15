<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useAsyncState, useWindowSize } from '@vueuse/core'
import { fetchMirrors } from '../../../api/mirrors'
import MirrorCard from './card.vue'
import type { MirrorViewItem } from '@/types/MirrorItem'

const mirrorQ = ref('')
const { width } = useWindowSize()
const isShrinked = computed(() => width.value <= 1250)
const choice = ref(1)

function compareByName(a: MirrorViewItem, b: MirrorViewItem) {
  const valA = a.alias || a.id
  const valB = b.alias || b.id
  return valA === valB ? 0 : valA > valB ? 1 : -1
}

function searchFilter(value: MirrorViewItem) {
  return value.status !== 'paused'
    && (value.alias || value.id)
      .toLocaleLowerCase()
      .includes(mirrorQ.value.toLocaleLowerCase())
}

const {
  state: mirrorState,
  isLoading: loading,
  error,
  execute: retryLoad,
} = useAsyncState(
  async () => {
    const data = await fetchMirrors()
    if (!data) {
      throw new Error('未获取到镜像数据')
    }

    const convertToViewItem = (item: any): MirrorViewItem => ({
      ...item,
      status: item.status as 'success' | 'syncing' | 'cached' | 'none' | 'failed' | 'pre-syncing' | 'paused' | 'disabled',
    })

    return {
      mirrors: (data.mirrors || []).map(convertToViewItem),
      proxies: (data.proxies || []).map(convertToViewItem),
      gits: (data.gits || []).map(convertToViewItem),
    }
  },
  { mirrors: [], proxies: [], gits: [] },
)

const mirrorData = computed(() => mirrorState.value.mirrors)
const proxyData = computed(() => mirrorState.value.proxies)
const gitData = computed(() => mirrorState.value.gits)

function getMirrorCardProps(item: MirrorViewItem) {
  return {
    id: item.id,
    type: choice.value,
    name: item.alias,
    lastUpdate: item.lastUpdateTimeString,
    status: item.status,
    size: item.sizeString,
    url: item.url,
    helpUrl: item.helpUrl,
    description: item.desc,
    isShrinked: isShrinked.value,
    upstream: item.upstream,
  }
}

function updateChoice(newChoice: number) {
  choice.value = newChoice
}

onMounted(() => {
  retryLoad()
})

onUnmounted(() => {
  // 在这里添加清理逻辑
})
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 md:col-span-9">
      <div class="mirror-list">
        <div v-if="loading" class="text-center py8">
          <p>加载中...</p>
        </div>

        <div v-else-if="error" class="text-center py8">
          <p class="text-red-500">
            {{ error }}
          </p>
        </div>

        <template v-else>
          <div
            v-if="choice === 1"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            <MirrorCard
              v-for="item in mirrorDataFilter"
              :key="item.id"
              v-bind="getMirrorCardProps(item)"
              class="bg-white dark:bg-dark-500 border-none box-border h-36 md:h-27"
            />
          </div>
          <div
            v-else-if="choice === 2"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            <MirrorCard
              v-for="item in proxyDataFilter"
              :key="item.id"
              v-bind="getMirrorCardProps(item)"
              class="bg-white dark:bg-dark-500 border-none box-border h-36 md:h-27"
            />
          </div>
          <div
            v-else-if="choice === 3"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            <MirrorCard
              v-for="item in gitDataFilter"
              :key="item.id"
              v-bind="getMirrorCardProps(item)"
              class="bg-white dark:bg-dark-500 border-none box-border h-36 md:h-27"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="col-span-12 md:col-span-3">
      <right-side-bar v-model:mirror-q="mirrorQ" @update:choice="updateChoice" />
    </div>
  </div>
</template>
