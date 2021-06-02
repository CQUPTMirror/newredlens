<template>
  <div class="sidebar">
    <div id="search">
      <span class="filter-item">
        <a-input
          v-model="mirrorQ"
          type="success"
          placeholder="搜索镜像"
          suffix-icon="el-icon-search"
          @onClick="search" />
      </span>
    </div>
    <div class="servernews">
      <a href="https://github.com/CQUPTMirror/MirrorsNews" style="text-decoration-line: none;"><h3>公告与新闻</h3></a>

      <p><a href="">Rsync 服务变更通知</a></p><p><a href="/">关于移除 nodesource 镜像的通知</a></p><p><a href="">关于 Deepin 相关镜像的临时变更通知（已解决）</a></p>

    </div>
    <div id="cdimages">
      <h3>获取发行版映像</h3>
      <p>这里为您提供各大主流 Linux 发行版的安装镜像 / ISO 文件，请根据您的发行版及其详细版本进行选择：</p>
      <p />
      <a-button type="primary" onclick="modal()">获取镜像&gt;</a-button>
    </div>
    <div id="report">
      <a href="https://github.com/CQUPTMirror/Report" style="text-decoration-line: none;"><h3>反馈建议</h3></a>
      <p>Bug或申请开新的镜像请提issue</p>
      <p><a href="https://github.com/CQUPTMirror/Report/issues/new">提交issue</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'RightSideBar',
  setup (props, context) {
    return {

    }
  }
})
</script>
<style lang="scss" scoped>

</style>
