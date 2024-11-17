<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import {
  NCard,
  NSelect,
  NSpace,
  NSpin,
  NTabPane,
  NTabs,
  useMessage,
} from 'naive-ui'
import VersionList from './VersionList.vue'
import { getIsoList } from '@/api/iso'
import type { IsoDistro, IsoFile } from '@/types/iso'

const message = useMessage()
const activeTab = ref('os')
const selectedItem = ref<string>('')

const { state: allDistros, isLoading } = useAsyncState<IsoDistro[]>(
  async () => {
    const data = await getIsoList()
    const firstOs = data.find(d => d.type === 'os')
    if (firstOs)
      selectedItem.value = firstOs.id
    return data
  },
  [],
)

const currentItems = computed(() => {
  return activeTab.value === 'os'
    ? allDistros.value.filter(d => d.type === 'os')
    : allDistros.value.filter(d => d.type !== 'os')
})

const currentSelected = computed(() => {
  return currentItems.value.find(d => d.id === selectedItem.value)
})

function groupFilesByVersion(files: IsoFile[]): Map<string, IsoFile[]> {
  const groups = new Map<string, IsoFile[]>()
  files.forEach((file) => {
    const version = file.version.replace(/^v/i, '')
    if (!groups.has(version))
      groups.set(version, [])
    groups.get(version)?.push(file)
  })
  return new Map([...groups.entries()]
    .sort((a, b) => b[0].localeCompare(a[0], undefined, { numeric: true })))
}

async function handleDownload(file: IsoFile) {
  try {
    const baseUrl = 'https://mirrors.cqupt.edu.cn'
    const downloadUrl = baseUrl + file.path
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file.path.split('/').pop() || 'iso-image.iso'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  catch (error) {
    message.error(`下载失败，请稍后重试${error}`)
  }
}

const tabs = [
  { key: 'os', label: '系统镜像', placeholder: '请选择操作系统' },
  { key: 'app', label: '应用软件', placeholder: '请选择应用软件' },
] as const

function handleTabChange(tab: string) {
  activeTab.value = tab
  const firstItem = allDistros.value.find(d =>
    tab === 'os' ? d.type === 'os' : d.type !== 'os',
  )
  selectedItem.value = firstItem?.id ?? ''
}
</script>

<template>
  <div class="iso-selector">
    <NSpace vertical>
      <NTabs
        v-model:value="activeTab"
        type="segment"
        animated
        @update:value="handleTabChange"
      >
        <NTabPane
          v-for="tab in tabs"
          :key="tab.key"
          :name="tab.key"
          :tab="tab.label"
        >
          <NSelect
            v-model:value="selectedItem"
            :options="currentItems.map(d => ({
              label: d.alias || d.id,
              value: d.id,
            }))"
            :placeholder="tabs.find(t => t.key === activeTab)?.placeholder"
            :loading="isLoading"
            filterable
            class="pb-4"
          />
          <NCard title="" class="iso-card h-100 max-h-400px overflow-y-auto">
            <template v-if="currentSelected && !isLoading">
              <VersionList
                :files="groupFilesByVersion(currentSelected.files)"
                @download="handleDownload"
              />
            </template>

            <div
              v-else-if="selectedItem && !isLoading"
              class="text-center text-gray-500 py-4"
            >
              暂无可用版本
            </div>

            <div
              v-else-if="!isLoading"
              class="text-center text-gray-500 py-4"
            >
              {{ tabs.find(t => t.key === activeTab)?.placeholder }}
            </div>

            <div
              v-else
              class="text-center py-4"
            >
              <NSpin :show="true" size="small" />
            </div>
          </NCard>
        </NTabPane>
      </NTabs>
    </NSpace>
  </div>
</template>

<style scoped>
.iso-card::-webkit-scrollbar {
  width: 6px;
}

.iso-card::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.iso-card::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.iso-card::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
