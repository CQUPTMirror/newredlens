<script setup lang="ts">
const links = [
  { text: '使用帮助', href: '#', icon: 'i-mdi-help-circle-outline' },
  { text: '镜像管理器 kubesync 源码', href: '#', icon: 'i-mdi-source-repository' },
  { text: '镜像站前端 redlens 源码', href: '#', icon: 'i-mdi-code-braces' },
]
</script>

<template>
  <footer class="mt-8 bg-$bgColor border-t border-$borderColor">
    <div class="max-w-[1200px] mx-auto px-6">
      <!-- 主要内容区域 -->
      <div class="py-8">
        <div class="flex flex-col md:flex-row justify-between gap-6">
          <!-- 左侧信息 -->
          <div class="flex-1">
            <p class="text-$textColor leading-7 text-sm">
              本开源镜像源由<a href="http://xxb.cqupt.edu.cn" class="link-hover mx-1">重庆邮电大学信息与网络管理中心</a>提供支持，<br>
              由<a href="https://redrock.team" class="link-hover mx-1">红岩网校工作站运维安全部/CQUPT-LUG</a>维护。
            </p>

            <div class="mt-4 flex items-center text-sm text-$textColor">
              <span class="mr-2">联系我们</span>
              <a
                href="https://github.com/CQUPTMirror/"
                class="flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <div class="i-mdi-github w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <!-- 右侧链接 -->
          <nav class="flex flex-wrap items-center gap-4">
            <a
              v-for="link in links"
              :key="link.text"
              :href="link.href"
              class="text-sm whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative group flex items-center gap-1"
            >
              <div class="w-4 h-4" :class="[link.icon]" />
              {{ link.text }}
              <div class="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500/50 dark:bg-blue-400/50 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>
        </div>
      </div>

      <!-- 底部分割线和Logo -->
      <div class="py-4 border-t border-$borderColor flex justify-between items-center">
        <div class="text-xs text-gray-400 dark:text-gray-500">
          © {{ new Date().getFullYear() }} CQUPT Mirror
        </div>
      </div>
    </div>
  </footer>
</template>
