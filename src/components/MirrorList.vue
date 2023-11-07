<template>
  <a-row :gutter="24">
    <a-col
      :md="18"
      :sm="24"
      :xs="24">
      <div class="mirror-list">
        <div v-if="choice===1" class="mirror-container">
          <MirrorCard
            v-for="item in mirrorDataFilter"
            :key="item.id"
            :id="item.id"
            class="mirror-card"
            :type="choice"
            :name="item.alias"
            :last-update="item.lastUpdateTimeString"
            :status="item.status"
            :size="item.sizeString"
            :url="item.url"
            :description="item.desc"
            :is-shrinked="isShrinked" />
        </div>
        <div v-else-if="choice===2" class="mirror-container">
          <MirrorCard
            v-for="item in proxyDataFilter"
            :key="item.id"
            :id="item.id"
            class="mirror-card"
            :type="choice"
            :name="item.alias"
            :url="item.url"
            :description="item.desc"
            :upstream="item.upstream" />
        </div>
        <div v-else-if="choice===3" class="mirror-container">
          <MirrorCard
            v-for="item in gitDataFilter"
            :key="item.id"
            :id="item.id"
            class="mirror-card"
            :type="choice"
            :name="item.alias"
            :last-update="item.lastUpdateTimeString"
            :status="item.status"
            :size="item.sizeString"
            :url="item.url"
            :description="item.desc"
            :is-shrinked="isShrinked" />
        </div>
      </div>
    </a-col>
    <a-col
      :md="6"
      :sm="24"
      :xs="24">
      <right-side-bar v-model:mirrorQ="mirrorQ" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MirrorCard from './MirrorCard.vue'
import RightSideBar from '@/views/sidebar/RightSideBar.vue'
import { MirrorItem, MirrorViewItem } from '@/types/MirrorItem'
import { mirrorViewShim } from '@/utils/shims'

const compareByName = (a: MirrorViewItem, b: MirrorViewItem) => {
  const valA = a.alias || a.id
  const valB = a.alias || a.id
  return valA === valB ? 0 : (valA > valB ? 1 : -1)
}

const searchFilter = (mirrorQ: string) => {
  return (value: MirrorViewItem) =>
    value.status !== 'paused' && (value.alias || value.id).toLocaleLowerCase().includes(mirrorQ.toLocaleLowerCase())
}

export default defineComponent({
  name: 'MirrorList',
  components: {
    RightSideBar,
    MirrorCard
  },
  data () {
    return {
      mirrorQ: '',
      mirrorData: [],
      proxyData: [],
      gitData: [],
      isShrinked: false,
      choice: 1
    }
  },
  computed: {
    mirrorDataFilter () {
      return (this.mirrorData as MirrorViewItem[]).sort(compareByName).filter(searchFilter(this.mirrorQ))
    },
    proxyDataFilter () {
      return (this.proxyData as MirrorViewItem[]).sort(compareByName).filter(searchFilter(this.mirrorQ))
    },
    gitDataFilter () {
      return (this.gitData as MirrorViewItem[]).sort(compareByName).filter(searchFilter(this.mirrorQ))
    }
  },
  created () {
    this.$axios
      .get(
        '/api/mirrors'
      )
      .catch(err => {
        console.log(err)
      })
      .then(resp => {
        this.mirrorData = (resp.data as MirrorItem[]).filter(item => item.type === 'mirror').map(mirrorViewShim)
        this.proxyData = (resp.data as MirrorItem[]).filter(item => item.type === 'proxy').map(mirrorViewShim)
        this.gitData = (resp.data as MirrorItem[]).filter(item => item.type === 'git').map(mirrorViewShim)
      })
    window.addEventListener('resize', this.onResize)
  },
  mounted () {
    this.$bus.on('list-update-msg', (choice) => {
      this.choice = choice
    })
  },
  methods: {
    onResize () {
      this.isShrinked = window.innerWidth <= 1250
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/theme/normal.scss';
.mirror-card {
  background-color: $float-bg;
  border: none;
  height: 144px;
  box-sizing: border-box;

  @media (prefers-color-scheme: dark) {
    background-color: $float-bg-dark;
    color: $main-font-dark;
  }

  @media (min-width: 991px) and (max-width: 1280px) {
    height: 108px;
  }
}
.mirror-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 32px;
}

@media (max-width: 1200px) {
  .mirror-container {
    gap: 24px 24px;
  }
}

@media (max-width: 991px) {
  .mirror-container {
    grid-template-columns: auto;
    padding: 0 !important;
  }
}

</style>
