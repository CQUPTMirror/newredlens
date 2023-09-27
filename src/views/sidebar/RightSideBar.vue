<template>
  <a-modal
    v-model:visible="newsModal"
    :style="{ text: 'center' }"
    title="公告">
    <template #footer>
      <a-button
        key="submit"
        type="primary"
        @click="closeModal">
        OK
      </a-button>
    </template>
    <div v-html="newsContent" />
  </a-modal>
  <div class="sidebar">
    <div id="search">
      <span class="filter-item">
        <a-input
          v-model:value="q"
          type="success"
          placeholder="搜索镜像"
          suffix-icon="el-icon-search" />
      </span>
    </div>
    <div class="servernews">
      <h3 style="font-weight: bolder;">公告与新闻</h3>
      <p
        v-for="item in news"
        :key="item.title">
        <a @click="openModal(item.title)">{{ item.title }}</a></p>
      <!--当公告数大于五的时候，考虑截取最新的五条公告-->

    </div>
    <div class="cdimages">
      <h3 style="font-weight: bolder;">获取发行版映像</h3>
      <p>这里为您提供各大主流 Linux 发行版的安装镜像 / ISO 文件，请根据您的发行版及其详细版本进行选择：</p>
      <p />
      <a-button type="primary" @click="modalVisible=true">获取镜像&gt;</a-button>
    </div>
    <div class="report">
      <a href="https://github.com/CQUPTMirror/Report" style="text-decoration-line: none;"><h3 style="font-weight: bolder;">反馈建议</h3></a>
      <p>Bug 或申请开新的镜像请提 issue</p>
      <p><a href="https://github.com/CQUPTMirror/Report/issues/new">提交 issue</a></p>
    </div>
    <a-modal
      v-model:visible="modalVisible"
      width="47%"
      title="获取镜像"
      @ok="handleOk">
      <template #footer>
        <a-button
          key="submit"
          type="primary"
          @click="handleOk">
          OK
        </a-button>
      </template>
      <a-tabs v-model:activeKey="categoryActiveKey" type="card">
        <a-tab-pane
          v-for="category in Object.getOwnPropertyNames(info)"
          :key="category"
          :tab="{os: '操作系统', app: '应用程序'}[category]">
          <a-tabs
            v-model:activeKey="itemActiveKey"
            tab-position="left">
            <a-tab-pane
              v-for="item in Object.getOwnPropertyNames(info[category])"
              :key="item"
              :tab="info[category][item].alias">
              <h2>{{ info[category][item].alias }}</h2>
              <ul>
                <li v-for="url in info[category][item].files" :key="url.name"><a :href="url.url">{{ url.name }}</a></li>
              </ul>
            </a-tab-pane>
          </a-tabs>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useIsoModal } from '@/hooks/use-iso-modal'
import axios from 'axios'
import { useNews } from '@/hooks/use-news'

export default defineComponent({
  name: 'RightSideBar',
  props: {
    mirrorQ: {
      type: String,
      default: ''
    }
  },
  emits: ['update:mirrorQ'],
  setup (props, context) {
    const { info, modalVisible, categoryActiveKey, itemActiveKey, handleOk } = useIsoModal()
    const { news, newsModal, newsContent, openModal, closeModal } = useNews()
    const q = computed({
      get () {
        return props.mirrorQ
      },
      set (value) {
        context.emit('update:mirrorQ', value)
      }
    })
    return {
      modalVisible,
      info,
      categoryActiveKey,
      itemActiveKey,
      handleOk,
      newsContent,
      news,
      newsModal,
      openModal,
      closeModal,
      q
    }
  }
})
</script>
<style lang="scss" scoped>
.sidebar {
  text-align: left;
  padding: 20px;
  .servernews {
    margin-top: 20px;
  }
  .report {
    margin-top: 20px;
  }
}

</style>
