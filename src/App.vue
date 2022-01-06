<template>
  <div style="height: 100%; position: relative;">
    <n-config-provider :theme="theme">
      <n-global-style />
      <n-layout position="absolute" :native-scrollbar="false">
        <n-layout-header style="height: 170px; padding: 24px;"><Header /></n-layout-header>
        <n-layout content-style="padding: 24px;">
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
        </n-layout><!--      &lt;!&ndash;      <n-layout-content content-style="padding: 24px;"><Content /></n-layout-content>&ndash;&gt;-->
        <n-layout-footer
          position="absolute"
          style="height: 170px; padding: 24px;"><Footer /></n-layout-footer>
      </n-layout></n-config-provider>
  </div>
</template>
<script lang="ts">

import { defineComponent, computed } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'
import Header from '@/components/Header.vue'
// import Content from '@/components/Content/index.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  components: {
    Header,
    Footer
  },
  setup () {
    const osThemeRef = useOsTheme()
    return {
      theme: computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
      osTheme: osThemeRef
    }
  }

})
</script>

<style lang="scss">
#app {
  display: flex;
  height: 100vh;
  flex-direction: column;
  text-align: left;
}

</style>
