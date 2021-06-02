<template>
  <div class="footer-wrapper">
    <div class="footer-main">
      <p>
        <span>本开源镜像源由</span>
        <a class="xxbnb" href="http://xxb.cqupt.edu.cn">重庆邮电大学信息与网络管理中心</a>
        <span>提供支持，<br>由</span>
        <a class="xxbnb" href="https://redrock.team">红岩网校工作站运维安全部/CQUPT-LUG</a>
        <span>维护。</span>
        <!-- <img class="logo" src="../assets/lug-logo.svg" alt="CQUPT-LUG" /> -->
        <svg class="iconfont logo">
          <use xlink:href="#icon-lug-logo" />
        </svg>
      </p>

      <span>联系我们：</span>
      <a href="https://github.com/CQUPTMirror/">
        <svg class="iconfont">
          <use xlink:href="#icon-github" />
        </svg>
        <span>GitHub</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer'
})
</script>

<style lang="scss" scoped>
.footer-wrapper {
  padding: 2em 96px;
  text-align: left;
  .footer-main {
    position: relative;
    a {
      text-decoration: none;
      color: unset;
      .iconfont {
        width: 24px;
        height: 24px;
        transform: translateY(6px);
        margin-right: 4px;
      }
    }
    .xxbnb {
      font-weight: bold;
    }
    .logo {
      height: 48px;
      width: 48px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  @media screen and (max-width: 1200px) {
    & {
      padding: 2em 24px;
    }
  }
}

</style>
