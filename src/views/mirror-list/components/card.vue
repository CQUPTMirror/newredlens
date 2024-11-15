<script setup lang="ts">
import { computed, ref } from 'vue'
import { MirrorDetail } from '@/assets/MirrorDetail.json'

interface Props {
  type?: number
  id?: string
  lastUpdate?: string
  upstream?: string
  status?: string
  size?: string
  name?: string
  description?: string
  url?: string
  helpUrl?: string
  isShrinked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 0,
  id: '',
  name: '',
  size: 'unknown',
  status: '',
  isShrinked: false,
})

const isMouseOver = ref(false)

// 计算属性
const getIconHref = computed(() => {
  if (!props.name)
    return props.type ? '#icon-mirror' : '#icon-proxy'

  const mirrorInfo = (MirrorDetail as Record<string, { icon?: string }>)[props.name]
  return mirrorInfo?.icon ? `#${mirrorInfo.icon}` : (props.type ? '#icon-mirror' : '#icon-proxy')
})

const statusIconHref = computed(() => {
  const iconMap = {
    success: '#icon-check-circle-fill',
    disabled: '#icon-minus-circle-fill',
    paused: '#icon-pause-circle-fill',
    failed: '#icon-close-circle-fill',
    syncing: '#icon-sync-fill',
  } as const

  return iconMap[props.status as keyof typeof iconMap] || '#icon-question-circle-fill'
})

const sourceUrl = computed(() => props.url || `/${props.id}/`)

// 方法
function openSourceUrl() {
  window.location.href = sourceUrl.value
}

function jumpHelpUrl(e: Event) {
  e.stopPropagation()
  if (props.helpUrl) {
    window.location.href = `https://help.mirrors.cqupt.edu.cn/${props.helpUrl}/?mirror=CQUPT`
  }
}

function onCopy(e: Event) {
  e.stopPropagation()
}
</script>

<template>
  <div
    class="p-6 h-full flex items-center cursor-pointer transition-all duration-400
           hover:(shadow-[0_2px_8px_rgba(0,0,0,0.09)])"
    :title="description"
    @click="openSourceUrl"
    @mouseover="isMouseOver = true"
    @mouseleave="isMouseOver = false"
  >
    <div class="flex items-center flex-grow">
      <div
        class="flex justify-center items-center w-16 h-16 rounded-full mr-6
                  md:(w-6 h-6 mr-2)"
      >
        <svg
          class="w-3/4 align-sub fill-current overflow-hidden"
          :style="isMouseOver ? { filter: 'unset' } : {}"
        >
          <use :xlink:href="getIconHref" />
        </svg>
      </div>

      <div class="flex flex-col items-start">
        <span
          class="text-2xl font-bold transform -translate-y-2.5 transition-all duration-400
                     md:(text-lg -translate-y-1.875)
                     sm:(text-base -translate-y-2)
                     xs:(-translate-y-1.75 text-[18px])
                     hover:translate-y-0"
        >
          {{ name || id }}
        </span>
        <span
          v-if="lastUpdate"
          class="transform -translate-y-2.5 opacity-0 transition-all duration-400
                     md:text-[1vw] sm:(text-[1vw] leading-[7pt])
                     hover:(translate-y-0 opacity-100) delay-200"
        >
          <span v-if="!isShrinked" class="sm:hidden md:hidden">最后更新：</span>
          {{ lastUpdate }}
        </span>
        <span
          v-else-if="upstream"
          class="transform -translate-y-2.5 opacity-0 transition-all duration-400
                     md:text-[1vw] sm:(text-[1vw] leading-[7pt])
                     hover:(translate-y-0 opacity-100) delay-200"
        >
          {{ upstream }}
        </span>
        <span
          v-else
          class="transform -translate-y-2.5 opacity-0 transition-all duration-400
                     hover:(translate-y-0 opacity-100) delay-200"
        >
          初次同步中...
        </span>
      </div>
    </div>

    <div class="flex relative">
      <span
        v-if="size !== 'unknown'"
        class="text-base leading-8 mr-2 transform -translate-x-2.5 opacity-0
                   transition-all duration-400 sm:hidden
                   hover:(translate-x-0 opacity-100) delay-200"
      >
        {{ size }}
      </span>
      <span v-else class="size-num" />

      <svg
        v-if="helpUrl"
        class="w-9 h-9 text-green-500 transition-all duration-200 transform
                  -translate-x-2.5 opacity-0 mr-0.5
                  hover:(translate-x-0 opacity-100)"
        @click.stop="jumpHelpUrl"
      >
        <use xlink:href="#icon-question-circle-fill" />
      </svg>

      <svg
        class="w-9 h-9 transition-all duration-200" :class="[
          { 'animate-spin animate-duration-2000 animate-linear animate-infinite': status === 'syncing' },
        ]"
      >
        <use :xlink:href="statusIconHref" />
      </svg>

      <div
        v-clipboard:copy="sourceUrl"
        v-clipboard:success="onCopy"
        class="absolute right-0 z-1"
      >
        <svg
          class="w-9 h-9 text-green-500 transition-all duration-200 transform
                    -translate-x-2.5 opacity-0
                    hover:(translate-x-0 opacity-100)"
        >
          <use xlink:href="#icon-file-copy-fill" />
        </svg>
      </div>
    </div>
  </div>
</template>
