<template>
  <div class="header-wrapper">
    <div class="logo">
      <img
        class="header-logo-pic"
        alt="Vue logo"
        src="../assets/oss-logo.svg">
      <div class="header-logo-text">
        <h2>重庆邮电大学开源镜像站</h2>
      </div>
    </div>
    <Bar class="bar" />
  </div>
</template>

<script>
import Bar from '@/components/Bar.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Header',
  components: {
    Bar
  }
})
</script>

<style lang="scss" scoped>

.header-wrapper {
  box-shadow: violet;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  .bar {
    @media (max-width: 768px) {
      margin-top: 24px;
    }
  }
  .logo {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    @media (max-width: 375px) {
      flex-wrap: wrap;
    }
    .header-logo-pic {
      height: 60px;
      margin-right: 10px;

      @media (max-width: 375px) {
        margin-right: 0;
      }
    }
    h2 {
      margin: 10px 0 0 0;
      font-weight: bold;
    }
  }
}
</style>
