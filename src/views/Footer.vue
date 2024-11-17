<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-8 bg-$bgColor border-t border-$borderColor">
    <div class="container mx-auto px-3 sm:px-4">
      <div class="py-6">
        <div class="flex flex-col items-center gap-4">
          <!-- Logo 和描述 -->
          <div class="flex flex-col items-center text-center">
            <div class="flex items-center gap-3 mb-3">
              <div class="text-xl font-medium text-$textColor flex items-center">
                <a
                  href="https://github.com/CQUPTMirror"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-$textColor flex items-center no-hover-line"
                >
                  <div class="i-simple-icons-github w-6 h-6" />
                </a>
                <span class="ml-3">CQUPT Mirror</span>
              </div>
            </div>
            <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-3xl">
              本开源镜像源由
              <a href="http://xxb.cqupt.edu.cn" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                重庆邮电大学信息与网络管理中心
              </a>
              提供支持，由
              <a href="https://redrock.team" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                红岩网校工作站运维安全部/CQUPT-LUG
              </a>
              维护。
            </p>
          </div>

          <!-- 版权信息 -->
          <div class="text-xs text-gray-400 dark:text-gray-500">
            © {{ currentYear }} CQUPT Mirror. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.i-mdi-sync {
  animation: spin 10s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
