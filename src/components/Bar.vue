<template>
  <div class="bar-wrapper">
    <a class="btn" @click="listUpdate(1)">镜像源列表</a>
    <a class="btn" @click="listUpdate(2)">反向代理列表</a>
    <a class="btn" @click="listUpdate(3)">Git镜像列表</a>
    <a
      class="btn"
      target="_blank"
      href="/status.html">
      系统状态
    </a>
    <a class="btn" href="docs/">
      使用帮助
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Bar',
  methods: {
    listUpdate (choice) {
      this.$bus.trigger('list-update-msg', choice)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../assets/theme/normal.scss";
.bar-wrapper {
  text-align: center;
  .btn {
    font-size: 16px;
    margin: 0 5px;
  }
  a {
    color: $main-font;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      transition: all 0.2s;
      color: $accent;
    }

    display: inline-block;
  }
}

</style>
