<template>
  <div class="text-center">
    <a class="text-base mx-1.25 text-main hover:text-accent transition-all duration-200 cursor-pointer inline-block no-underline" @click="emit('listUpdate', 1)">镜像源列表</a>
    <a class="text-base mx-1.25 text-main hover:text-accent transition-all duration-200 cursor-pointer inline-block no-underline" @click="emit('listUpdate', 2)">反向代理列表</a>
    <a class="text-base mx-1.25 text-main hover:text-accent transition-all duration-200 cursor-pointer inline-block no-underline" @click="emit('listUpdate', 3)">Git镜像列表</a>
    <a
      class="text-base mx-1.25 text-main hover:text-accent transition-all duration-200 cursor-pointer inline-block no-underline"
      target="_blank"
      href="/status.html">
      系统状态
    </a>
    <a 
      class="text-base mx-1.25 text-main hover:text-accent transition-all duration-200 cursor-pointer inline-block no-underline" 
      href="https://help.mirrors.cqupt.edu.cn">
      使用帮助
    </a>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'listUpdate', choice: number): void
}>()
</script>
