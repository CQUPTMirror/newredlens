<script setup lang="ts">
import { h, ref } from 'vue'
import { NButton, NInput, useNotification } from 'naive-ui'
import { useNews } from '@/hooks/use-news'
import type { NewsItem } from '@/api/news'

const notification = useNotification()
const { newsList } = useNews()
const searchQuery = ref('')

// TODO
// 1. 日常新闻展示
// 2. 需要关注的信息高亮展示
// 3. 重要信息弹窗展示
//  TODO
// 1. 发行版及处理器架构选择引导
//   2. 常见版本区别说明


// 从 localStorage 初始化已读新闻 ID
const readNewsIds = ref(new Set(
  JSON.parse(localStorage.getItem('readNewsIds') || '[]'),
))

// 保存已读状态到 localStorage
function saveReadState() {
  localStorage.setItem('readNewsIds', JSON.stringify([...readNewsIds.value]))
}

// 显示新闻详情
function showNewsDetail(news: NewsItem) {
  // 立即标记为已读并保存
  readNewsIds.value.add(news.id)
  saveReadState()

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

// 检查新闻是否已读
function isNewsRead(newsId: string | number) {
  return readNewsIds.value.has(newsId)
}

// 获取ISO处理函数
function handleGetISO() {
  // TODO: 实现ISO下载逻辑
}

// 反馈建议处理函数
function handleFeedback(type: 'issue' | 'email' | 'chat') {
  const urls = {
    issue: 'https://github.com/your-repo/issues',
    email: 'mailto:redrock-sre@example.com',
    chat: '#cqupt-lug',
  }
  window.open(urls[type], '_blank')
}
</script>

<template>
  <div class="h-full flex flex-col p-4 bg-white dark:bg-[#18181c]">
    <!-- 搜索框 -->
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
    <section class="mb-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-bell text-xl text-gray-700 dark:text-gray-300" />
        <h3 align-text class="text-gray-800 dark:text-gray-200">
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
            : 'text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300'"
          @click="showNewsDetail(news)"
        >
          <span class="flex-1">{{ news.title }}</span>
          <n-tag
            v-if="!isNewsRead(news.id)"
            size="small"
            type="info"
            round
          >
            新
          </n-tag>
        </div>
      </div>
    </section>

    <!-- 域名选择 -->
    <section class="mb-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-connection text-xl text-gray-700 dark:text-gray-300" />
        <h3 align-text class="text-gray-800 dark:text-gray-200">
          域名选择
        </h3>
      </div>
      <div class="space-y-2">
        <div class="text-sm flex items-center">
          <a
            href="https://mirrors.cqupt.edu.cn"
            class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            https://mirrors.cqupt.edu.cn
          </a>
          <span class="text-gray-500 dark:text-gray-400 ml-2">自动选择</span>
        </div>
        <div class="text-sm flex items-center">
          <a
            href="https://ipv4.mirrors.cqupt.edu.cn"
            class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            https://ipv4.mirrors.cqupt.edu.cn
          </a>
          <span class="text-gray-500 dark:text-gray-400 ml-2">仅 IPv4</span>
        </div>
        <div class="text-sm flex items-center">
          <a
            href="https://ipv6.mirrors.cqupt.edu.cn"
            class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            https://ipv6.mirrors.cqupt.edu.cn
          </a>
          <span class="text-gray-500 dark:text-gray-400 ml-2">仅 IPv6</span>
        </div>
      </div>
    </section>

    <!-- 获取发行版映像 -->
    <section class="mb-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-download text-xl text-gray-700 dark:text-gray-300" />
        <h3 align-text class="text-gray-800 dark:text-gray-200">
          获取发行版映像
        </h3>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
        这里为您提供各大主流 Linux 发行版的安装镜像 / ISO 文件，请根据您的发行版及其详细版本进行选择：
      </p>
      <NButton
        secondary
        type="default"
        @click="handleGetISO"
      >
        获取镜像
      </NButton>
    </section>

    <!-- 反馈建议 -->
    <section class="mb-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="i-ep-notification text-xl text-gray-700 dark:text-gray-300" />
        <h3 align-text class="text-gray-800 dark:text-gray-200">
          反馈建议
        </h3>
      </div>
      <div class="space-y-2">
        <div class="text-sm">
          <a
            href="#"
            class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
            @click="handleFeedback('issue')"
          >
            Bug 或申请开新的镜像请提 issue
          </a>
        </div>
        <div class="text-sm">
          <a
            href="#"
            class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
            @click="handleFeedback('email')"
          >
            Redrock SRE 邮箱
          </a>
        </div>
        <div class="text-sm">
          <a
            href="#"
            class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
            @click="handleFeedback('chat')"
          >
            CQUPT LUG 交流群
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
