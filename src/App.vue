<template>
  <div id="app">
    <header id="header">
      <Header />
    </header>
    <div class="main-wrapper">
      <MirrorList />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import '@/assets/theme/normal.scss'

import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import MirrorList from '@/components/MirrorList.vue'
// import IsoInfo from '@/views/IsoInfo.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    MirrorList
  }
})
</script>

<style lang="scss">
@import 'assets/theme/normal.scss';
body {
  margin: 0;
  background-color: $main-bg;
}
#app {
  display: flex;
  height: 100vh;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  background-color: $main-bg;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
body,
h2,
a {
  color: $main-font;
}
#header {
  padding: 36px 96px 24px 96px;
}
.main-wrapper {
  padding: 24px 96px;
  flex: 1;
  background-color: #f3f4fa;
}
.iconfont {
  filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(3250%) hue-rotate(251deg) brightness(89%) contrast(97%);
}

@media screen and (max-width: 1200px) {
  .main-wrapper {
    padding: 24px 24px;
  }
  #header {
    padding: 36px 24px 24px 24px;
  }
}

@media (max-width: 768px) {
  #header {
    padding: 36px 24px 0 24px;
  }
}

@media (max-width: 375px) {
  .main-wrapper {
    padding: 24px 0;
  }
}

@media (prefers-color-scheme: dark) {
  body,
  h1, h2, h3, h4, h5, h6,
  a {
    color: $main-font-dark !important;
  }
  .ant-input {
    background-color: $float-bg-dark !important;
    color: $main-font-dark !important;
    border: 1px solid $main-border-dark !important;
  }
  .iconfont {
    filter: brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(554%) hue-rotate(23deg) brightness(112%) contrast(75%)
  }
  body,
  #app,
  .main-wrapper,
  .footer-wrapper {
    background-color: $main-bg-dark;
  }
  .mirror-card {
    color: $main-font-dark;
  }

  // "获取镜像" popup start
  .ant-modal-content {
    background-color: $main-bg-dark !important;
    color: $main-font-dark !important;
  }
  .ant-modal-header,
  .ant-tabs-nav-scroll,
  .ant-modal-footer {
    background-color: $main-bg-dark !important;
    border-color: $main-border-dark !important;
  }
  .ant-tabs-nav-scroll .ant-tabs-tab {
    background-color: $main-bg-dark !important;
    color: $main-font-dark !important;
    border: none !important;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    border-bottom: 1px solid #fff !important;
  }
  .ant-tabs .ant-tabs-left-content {
    border-left: none !important;
  }
  .ant-modal-title,
  .ant-modal-close,
  .ant-tabs-tabpane {
    color: $main-font-dark !important;
  }
  // "获取镜像" popup end
}
</style>
