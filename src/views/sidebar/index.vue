<script setup lang="ts">
import { h, ref } from 'vue'
import { useLocalStorage, useToggle } from '@vueuse/core'
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NInput,
  NModal,
  NTag,
  useNotification,
} from 'naive-ui'
import IsoSelector from './IsoSelector.vue'
import { useNews } from '@/hooks/use-news'
import type { NewsItem } from '@/api/news'

const notification = useNotification()
const { newsList } = useNews()
const searchQuery = ref('')

const [showIso, toggleIso] = useToggle(false)

// 使用 useLocalStorage 来持久化已读新闻ID
const readNewsIds = useLocalStorage('readNewsIds', new Set<string | number>())

const FEEDBACK_URLS = {
  issue: {
    url: 'https://github.com/your-repo/issues',
    label: 'Bug 或申请开新的镜像请提 issue',
  },
  email: {
    url: 'mailto:redrock-sre@example.com',
    label: 'Redrock SRE 邮箱',
  },
  chat: {
    url: '#cqupt-lug',
    label: 'CQUPT LUG 交流群',
  },
} as const

const MIRROR_DOMAINS = [
  {
    url: 'https://mirrors.cqupt.edu.cn',
    label: '自动选择',
  },
  {
    url: 'https://ipv4.mirrors.cqupt.edu.cn',
    label: '仅 IPv4',
  },
  {
    url: 'https://ipv6.mirrors.cqupt.edu.cn',
    label: '仅 IPv6',
  },
] as const

// 显示新闻详情
function showNewsDetail(news: NewsItem) {
  readNewsIds.value.add(news.id)

  const notificationInstance = notification.info({
    title: '公告',
    content: () => h('div', [
      h('div', {
        innerHTML: news.content,
        style: {
          maxWidth: '600px',
          maxHeight: '400px',
          overflow: 'auto',
        },
      }),
    ]),
    action: () => h('div', {
      style: {
        textAlign: 'right',
        marginTop: '16px',
      },
    }, [
      h('n-button', {
        text: true,
        type: 'primary',
        onClick: () => {
          notificationInstance.destroy()
        },
      }, { default: () => '已读' }),
    ]),
    duration: 0,
    closable: true,
    keepAliveOnHover: true,
  })
}

function isNewsRead(newsId: string | number) {
  return readNewsIds.value.has(newsId)
}

function handleGetIso() {
  toggleIso(true)
}

function handleFeedback(type: keyof typeof FEEDBACK_URLS) {
  window.open(FEEDBACK_URLS[type].url, '_blank')
}
</script>

<template>
  <div class="h-full flex flex-col p-4 bg-white dark:bg-[#18181c]">
    <div class="mb-6">
      <NInput
        v-model:value="searchQuery"
        placeholder="搜索镜像"
        clearable
      >
        <template #prefix>
          <div class="i-ep-search text-lg text-gray-400" />
        </template>
      </NInput>
    </div>

    <!-- 公告与新闻 -->
    <section class="mb-8 p-3 rounded-lg">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-bell text-xl text-primary" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200 m-0">
          公告与新闻
        </h3>
      </div>
      <div class="space-y-3">
        <div
          v-for="news in newsList"
          :key="news.id"
          class="text-sm cursor-pointer flex items-center gap-2"
          :class="isNewsRead(news.id)
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-blue-500 dark:text-blue-400'"
          @click="showNewsDetail(news)"
        >
          <span class="flex-1">{{ news.title }}</span>
          <NTag
            v-if="!isNewsRead(news.id)"
            size="small"
            type="info"
            round
          >
            NEW！
          </NTag>
        </div>
      </div>
    </section>

    <!-- 域名选择 -->
    <section class="mb-8 p-3 rounded-lg">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-connection text-xl text-primary" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200 m-0">
          域名选择
        </h3>
      </div>
      <div class="space-y-2.5">
        <div
          v-for="domain in MIRROR_DOMAINS"
          :key="domain.url"
          class="flex items-center gap-3"
        >
          <a
            :href="domain.url"
            class="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
          >
            {{ domain.url.replace('https://', '') }}
          </a>
          <span class="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {{ domain.label }}
          </span>
        </div>
      </div>
    </section>

    <!-- 获取发行版映像 -->
    <section class="mb-8 p-3 rounded-lg">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-download text-xl text-primary" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200 m-0">
          获取发行版映像
        </h3>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
        提供各大主流 Linux 发行版的安装镜像 / ISO 文件
      </p>
      <NButton
        type="primary"
        class="w-48 h-9 text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2 hover:translate-y-[-1px] hover:shadow-md active:translate-y-0 active:shadow-none"
        @click="handleGetIso"
      >
        <div class="i-ep-download text-lg" />
        获取镜像
      </NButton>
    </section>

    <!-- 反馈建议 -->
    <section class="mb-8 p-3 rounded-lg">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-notification text-xl text-primary" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200 m-0">
          反馈建议
        </h3>
      </div>
      <div class="space-y-2">
        <div
          v-for="(feedback, key) in FEEDBACK_URLS"
          :key="key"
          class="text-sm"
        >
          <a
            href="#"
            class="text-blue-500 dark:text-blue-400"
            @click.prevent="handleFeedback(key)"
          >
            {{ feedback.label }}
          </a>
        </div>
      </div>
    </section>

    <!-- ISO -->
    <NModal
      v-model:show="showIso"
      preset="card"
      title="获取发行版映像"
      style="max-width: 600px; height: 80vh"
    >
      <IsoSelector />
      <NCollapse class="mt-4">
        <NCollapseItem title="下载帮助" name="help">
          <div class="text-sm space-y-2">
            <a href="https://help.mirrors.cqupt.edu.cn" blank>帮助文档</a>
          </div>
        </NCollapseItem>
      </NCollapse>
    </NModal>
  </div>
</template>
