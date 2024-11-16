<script setup lang="ts">
import { NButton } from 'naive-ui'
import type { IsoFile } from '@/types/iso'

defineProps<{
  files: Map<string, IsoFile[]>
}>()

defineEmits<{
  (e: 'download', file: IsoFile): void
}>()
</script>

<template>
  <div class="version-list">
    <div
      v-for="[version, versionFiles] in files"
      :key="version"
      class="version-group"
    >
      <div>
        <h3 class="text-base font-medium m-0 p-0">
          {{ version }}
        </h3>
      </div>

      <div class="download-list pl-2 space-y-2">
        <div
          v-for="file in versionFiles"
          :key="file.path"
          class="flex items-center justify-between py-1 transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
        >
          <div class="flex-1">
            <div class="text-sm">
              {{ file.name }}
            </div>
            <div class="text-xs text-gray-500 space-x-2">
              <span>{{ file.arch }}</span>
              <span>·</span>
              <span>{{ file.sizeStr }}</span>
            </div>
          </div>
          <NButton
            text
            type="primary"
            size="tiny"
            @click="$emit('download', file)"
          >
            <template #icon>
              <div class="i-carbon-download" />
            </template>
            下载
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>
