<script setup lang="ts">
import { h } from 'vue'
import { useLocalStorage, useToggle } from '@vueuse/core'
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NModal,
  NTag,
  useNotification,
} from 'naive-ui'
import IsoSelector from './IsoSelector.vue'
import { useNews } from '@/hooks/use-news'
import type { NewsItem } from '@/api/news'

const notification = useNotification()
const { newsList } = useNews()

const [showIso, toggleIso] = useToggle(false)

// 使用 useLocalStorage 来持久化已读新闻ID
const readNewsIds = useLocalStorage('readNewsIds', new Set<string | number>())

const FEEDBACK_URLS = {
  issue: {
    url: 'https://github.com/CQUPTMirror/Report/issues/new',
    label: 'Bug 或申请开新的镜像请提 issue',
  },
  email: {
    url: 'mailto:sre@redrock.team',
    label: 'Redrock SRE 邮箱',
  },
  chat: {
    url: 'https://qm.qq.com/q/6GJz4XhqDK',
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
  <div class="h-full flex flex-col">
    <!-- 公告与新闻 -->
    <section class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-carbon-notification text-xl text-green-500 dark:text-green-300" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100 m-0">
          最新公告
        </h3>
      </div>
      <div class="space-y-2">
        <div
          v-for="news in newsList"
          :key="news.id"
          class="text-sm cursor-pointer flex items-center gap-2"
          :class="isNewsRead(news.id)
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-green-500 dark:text-green-400'"
          @click="showNewsDetail(news)"
        >
          <span class="flex-1">{{ news.title }}</span>
          <NTag
            v-if="!isNewsRead(news.id)"
            size="small"
            type="info"
            round
          >
            NEW!
          </NTag>
        </div>
      </div>
    </section>

    <!-- 获取发行版映像 -->
    <section class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-carbon-download text-xl text-green-500 dark:text-green-300" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-50 m-0">
          获取发行版映像
        </h3>
      </div>
      <NButton
        type="primary"
        class="w-full h-9 text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2"
        @click="handleGetIso"
      >
        <div class="i-carbon-download text-lg" />
        获取镜像
      </NButton>
    </section>

    <!-- 域名选择 -->
    <section class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-carbon-link text-xl text-green-500 dark:text-green-300" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-50 m-0">
          镜像源地址
        </h3>
      </div>
      <div class="space-y-2">
        <div
          v-for="domain in MIRROR_DOMAINS"
          :key="domain.url"
          class="flex items-center gap-2"
        >
          <a
            :href="domain.url"
            class="text-sm text-gray-600 hover:text-green-500 dark:text-gray-200 dark:hover:text-green-300 transition-colors"
          >
            {{ domain.url.replace('https://', '') }}
          </a>
          <span class="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
            {{ domain.label }}
          </span>
        </div>
      </div>
    </section>

    <!-- 反馈建议 -->
    <section class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-carbon-chat-bot text-xl text-green-500 dark:text-green-300" />
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200 m-0">
          问题反馈
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
            class="text-sm text-gray-600 hover:text-green-500 dark:text-gray-200 dark:hover:text-green-300 transition-colors"
            @click.prevent="handleFeedback(key)"
          >
            {{ feedback.label }}
          </a>
        </div>
      </div>
    </section>

    <!-- ISO Modal -->
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
            <a
              href="https://help.mirrors.cqupt.edu.cn"
              class="text-green-500 hover:text-green-600 dark:text-green-300 dark:hover:text-green-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              帮助文档
            </a>
          </div>
        </NCollapseItem>
      </NCollapse>
    </NModal>
  </div>
</template>
