<template>
  <div class="header-wrapper">
    <div class="logo">
      <img
        class="header-logo-pic"
        alt="logo"
        src="../assets/oss-logo.svg">
      <div class="header-logo-text">
        <h2>重庆邮电大学开源镜像站</h2>
      </div>
    </div>
    <div class="bar">
      <n-menu
        mode="horizontal"
        :options="menuOptions" />
    </div>
  </div>
</template>

<script>

import { defineComponent, h, resolveComponent } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  List as ListIcon,
  Power as NotificationIcon,
  Moon as NightModeIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '镜像列表'
      ),
    key: 'mirror-list',
    icon: renderIcon(ListIcon)
  },
  {
    label: '系统状态',
    key: 'system-status',
    icon: renderIcon(NotificationIcon)
  },
  {
    label: '帮助文档',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon)
  }
]

export default defineComponent({
  setup () {
    return {
      menuOptions
    }
  }
})
</script>

<style lang="scss" scoped>
.header-wrapper {
  padding: 2em 96px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 768px) {
    padding-top: 0;
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
