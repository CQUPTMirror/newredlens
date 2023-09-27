<template>
  <div
    class="card-body"
    :title="description"
    @click="openSourceUrl"
    @mouseover="isMouseOver=true"
    @mouseleave="isMouseOver=false">
    <div class="brief">
      <div class="icon">
        <svg
          class="iconfont"
          :style="isMouseOver?{filter:'unset'}:{}">
          <use :xlink:href="(infoMapAfter[id ?? '']?.icon)?'#'+ (infoMapAfter[id ?? '']?.icon) :type?'#icon-mirror':'#icon-proxy'" />
        </svg>
      </div>
      <div class="detail-left">
        <span class="title">{{ name ?? id }}</span>
        <span v-if="lastUpdate" class="update">
          <span v-if="!isShrinked" class="lastUpdate">最后更新：</span>
          {{ lastUpdate }}
        </span>
        <span v-else-if="upstream" class="update">
          {{ upstream }}
        </span>
        <span v-else class="update">
          初次同步中...
        </span>
      </div>
    </div>
    <div class="detail">
      <span v-if="size!=='unknown'" class="size-num">{{ size }}</span>
      <span v-else class="size-num" />
      <svg
        v-if="infoMap[id ?? '']?.help!==undefined"
        id="i-howto"
        class="iconfont icon-i"
        @click.stop="jumpHelpUrl">
        <use xlink:href="#icon-question-circle-fill" />
      </svg>
      <svg v-if="status=='success'" class="iconfont">
        <use xlink:href="#icon-check-circle-fill" />
      </svg>
      <svg v-else-if="status=='disabled'" class="iconfont">
        <use xlink:href="#icon-minus-circle-fill" />
      </svg>
      <svg v-else-if="status=='paused'" class="iconfont">
        <use xlink:href="#icon-pause-circle-fill" />
      </svg>
      <svg v-else-if="status=='failed'" class="iconfont">
        <use xlink:href="#icon-close-circle-fill" />
      </svg>
      <svg v-else-if="status=='syncing'" class="iconfont rotate">
        <use xlink:href="#icon-sync-fill" />
      </svg>
      <svg v-else class="iconfont">
        <use xlink:href="#icon-question-circle-fill" />
      </svg>
      <div
        v-clipboard:copy="genSourceUrl()"
        v-clipboard:success="copy">
        <svg
          id="i-copy"
          class="iconfont icon-i">
          <use xlink:href="#icon-file-copy-fill" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MirrorDetail } from '../assets/MirrorDetail.json'
export default {
  name: 'MirrorCard',
  props: {
    type: Number,
    id: String,
    lastUpdate: String,
    upstream: String,
    status: String,
    size: String,
    name: String,
    description: String,
    url: String,
    isShrinked: Boolean
  },
  data () {
    return {
      isMouseOver: false,
      isModalVisible: false,
      infoMap: MirrorDetail
    }
  },
  computed: {
    infoMapAfter: function () {
      let infoMap = this.infoMap
      if (this.name.length && !Object.prototype.hasOwnProperty.call(infoMap, this.name)) {
        infoMap[this.name] = {}
      }
      return infoMap
    }
  },
  methods: {
    genSourceUrl: function () {
      return this.url || `/${this.id}/`
    },
    openSourceUrl: function () {
      window.location.href = this.genSourceUrl()
    },
    jumpHelpUrl: function () {
      window.location.href = `/docs/#/${this.type === 1 ? 'mirror' : 'proxy'}/${
        this.infoMap[this.id]['help']
      }`
    },
    copy: function () {
      event.stopPropagation()
      window.alert('源地址复制成功')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/normal.scss';

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: rotating 2s linear infinite;
}
.card-body {
  cursor: pointer;
  padding: 24px;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
  .update {
    transform: translateY(10px);
    opacity: 0;
    transform-style: flat;
    transition-duration: 0.4s;

    @media screen and (min-width: 991px) and (max-width: 1280px) {
      font-size: 1vw;
    }

    @media screen and (max-width: 576px) {
      font-size: 1vw;
      line-height: 7pt;
    }
  }
  .size-num {
    transform: translateX(10px);
    opacity: 0;
    transform-style: ease-in;
    transition-duration: 0.4s;

    @media (max-width: 576px) {
      display: none;
    }
  }
  .title {
    transform: translateY(10px);
    font-size: 24px;
    font-weight: bold;
    transform-style: ease-in;
    transition-duration: 0.4s;

    @media (max-width: 576px) {
      transform: translateY(8px);
      font-size: 20px;
    }

    @media (max-width: 375px) {
      transform: translateY(7px);
      font-size: 18px;
    }

    @media screen and (min-width: 991px) and (max-width: 1280px) {
      transform: translateY(7.5px);
    }
  }
  &:hover {
    .size-num,
    .update {
      transform: translateY(0) translateX(0);
      transition-delay: 0.2s;
      transform-style: ease-in;
      transition-duration: 0.4s;
      opacity: 1;
    }
    .title {
      transform: translateY(0);
      transition: all 0.4s;
    }
    .detail .iconfont {
      opacity: 0;
    }
    #i-copy,
    #i-howto {
      transform: translateX(0);
      transition: all 0.2s;
      opacity: 1;
    }
  }
}
.brief {
  display: flex;
  align-items: center;
  flex-grow: 1;
  .iconfont {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    width: 75%;
  }
  .lastUpdate {
    @media (max-width: 576px) {
      display: none;
    }

    @media screen and (min-width: 991px) and (max-width: 1280px) {
      display: none;
    }
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-right: 24px;

    @media screen and (min-width: 991px) and (max-width: 1280px) {
      /* display: none; */
      width: 24px;
      height: 24px;
      margin-right: 8px;
      .iconfont {
        width: 24px;
      }
    }
    i {
      font-size: 48px;
    }
  }
  .detail-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
.detail {
  display: flex;
  position: relative;
  .size-num {
    font-size: 16px;
    line-height: 32px;
    margin-right: 8px;
  }
  .iconfont {
    width: 36px;
    height: 36px;
    transition: all 0.2s;
  }
  .icon-i {
    color: #52c41a;
    transition: all 0.2s;
    font-size: 32px;
  }
  #i-howto {
    transition: all 0.2s;
    margin-right: 0.2em;
    transform: translateX(10px);
    opacity: 0;
  }
  #i-copy {
    position: absolute;
    transition: all 0.2s;
    opacity: 0;
    z-index: 1;
    right: 0;
  }
}
</style>
