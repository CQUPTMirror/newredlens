<template>
  <div id="app">
    <header id="header">
      <Header />
    </header>
    <div class="main-wrapper">
      <!--<IsoInfo />-->
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
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  background-color: $main-bg;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
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
  h2,
  a {
    color: $main-font-dark;
  }
  .iconfont {
    filter: brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(554%) hue-rotate(23deg) brightness(112%) contrast(75%)
  }
  body,
  #app {
    background-color: $main-bg-dark;
  }
}
</style>
