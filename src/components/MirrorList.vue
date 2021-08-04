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
            :key="item.value"
            class="mirror-card"
            :type="choice"
            :name="item.name"
            :last-update="item.last_update"
            :status="item.status"
            :size="item.size"
            :url="item.url"
            :is-shrinked="isShrinked" />
        </div>
        <div v-else class="mirror-container">
          <MirrorCard
            v-for="item in proxyDataFilter"
            :key="item.value"
            class="mirror-card"
            :type="choice"
            :name="item.name"
            :url="item.url"
            :upstream="item.upstream" />
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
import MirrorCard from './MirrorCard.vue'
import { defineComponent } from 'vue'
import RightSideBar from '@/views/sidebar/RightSideBar.vue'
import { MirrorItem } from '@/types/MirrorItem'

const compareByName = (a: MirrorItem, b: MirrorItem) => a.name === b.name ? 0 : (a.name > b.name ? 1 : -1)

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
      isShrinked: false,
      choice: 1
    }
  },
  computed: {
    mirrorDataFilter () {
      return (this.mirrorData as MirrorItem[]).sort(compareByName).filter(
        value => value.is_master && value.status !== 'paused' && value.name.includes(this.mirrorQ)
      )
    },
    proxyDataFilter () {
      return (this.proxyData as MirrorItem[]).sort(compareByName)
    }
  },
  created () {
    let baseURL = 'http://mirror.cqupt.edu.cn'
    this.$axios
      .get(
        `${
          process.env.NODE_ENV === 'production'
            ? window.location.origin
            : baseURL
        }/static/tunasync.json`
      )
      .catch(err => {
        console.log(err)
        this.mirrorData = [
          { 'name': 'deepin-cd', 'is_master': true, 'status': 'success', 'last_update': '2020-07-22 01:15:17 +0800', 'last_update_ts': 1595351717, 'last_started': '2020-07-21 22:09:24 +0800', 'last_started_ts': 1595340564, 'last_ended': '2020-07-22 01:15:17 +0800', 'last_ended_ts': 1595351717, 'next_schedule': '2020-07-22 07:15:17 +0800', 'next_schedule_ts': 1595373317, 'upstream': 'rsync://archive.ubuntu.com/ubuntu/', 'size': '1.41T' },
          { 'name': 'pypi', 'is_master': true, 'status': 'syncing', 'last_update': '2020-07-21 19:06:25 +0800', 'last_update_ts': 1595329585, 'last_started': '2020-07-21 19:11:29 +0800', 'last_started_ts': 1595329889, 'last_ended': '2020-07-21 19:06:25 +0800', 'last_ended_ts': 1595329585, 'next_schedule': '0001-01-01 00:00:00 +0000', 'next_schedule_ts': -62135596800, 'upstream': 'https://pypi.python.org/', 'size': '7.17T' },
          { 'name': 'centos', 'is_master': true, 'status': 'success', 'last_update': '2020-07-21 23:51:03 +0800', 'last_update_ts': 1595346663, 'last_started': '2020-07-21 23:39:39 +0800', 'last_started_ts': 1595345979, 'last_ended': '2020-07-21 23:51:03 +0800', 'last_ended_ts': 1595346663, 'next_schedule': '2020-07-22 05:51:03 +0800', 'next_schedule_ts': 1595368263, 'upstream': 'rsync://msync.centos.org/CentOS/', 'size': '300G' },
          { 'name': 'ubuntuttttttttttt-ttttttttttest', 'is_master': true, 'status': 'success', 'last_update': '2020-07-22 01:15:17 +0800', 'last_update_ts': 1595351717, 'last_started': '2020-07-21 22:09:24 +0800', 'last_started_ts': 1595340564, 'last_ended': '2020-07-22 01:15:17 +0800', 'last_ended_ts': 1595351717, 'next_schedule': '2020-07-22 07:15:17 +0800', 'next_schedule_ts': 1595373317, 'upstream': 'rsync://archive.ubuntu.com/ubuntu/', 'size': '1.41T' },
          { 'name': 'pypi', 'is_master': true, 'status': 'syncing', 'last_update': '2020-07-21 19:06:25 +0800', 'last_update_ts': 1595329585, 'last_started': '2020-07-21 19:11:29 +0800', 'last_started_ts': 1595329889, 'last_ended': '2020-07-21 19:06:25 +0800', 'last_ended_ts': 1595329585, 'next_schedule': '0001-01-01 00:00:00 +0000', 'next_schedule_ts': -62135596800, 'upstream': 'https://pypi.python.org/', 'size': '7.17T' },
          { 'name': 'centos', 'is_master': true, 'status': 'success', 'last_update': '2020-07-21 23:51:03 +0800', 'last_update_ts': 1595346663, 'last_started': '2020-07-21 23:39:39 +0800', 'last_started_ts': 1595345979, 'last_ended': '2020-07-21 23:51:03 +0800', 'last_ended_ts': 1595346663, 'next_schedule': '2020-07-22 05:51:03 +0800', 'next_schedule_ts': 1595368263, 'upstream': 'rsync://msync.centos.org/CentOS/', 'size': '300G' },
          { 'name': 'ubuntuttttttttttt-ttttttttttest', 'is_master': true, 'status': 'success', 'last_update': '2020-07-22 01:15:17 +0800', 'last_update_ts': 1595351717, 'last_started': '2020-07-21 22:09:24 +0800', 'last_started_ts': 1595340564, 'last_ended': '2020-07-22 01:15:17 +0800', 'last_ended_ts': 1595351717, 'next_schedule': '2020-07-22 07:15:17 +0800', 'next_schedule_ts': 1595373317, 'upstream': 'rsync://archive.ubuntu.com/ubuntu/', 'size': '1.41T' },
          { 'name': 'pypi', 'is_master': true, 'status': 'syncing', 'last_update': '2020-07-21 19:06:25 +0800', 'last_update_ts': 1595329585, 'last_started': '2020-07-21 19:11:29 +0800', 'last_started_ts': 1595329889, 'last_ended': '2020-07-21 19:06:25 +0800', 'last_ended_ts': 1595329585, 'next_schedule': '0001-01-01 00:00:00 +0000', 'next_schedule_ts': -62135596800, 'upstream': 'https://pypi.python.org/', 'size': '7.17T' },
          { 'name': 'centos', 'is_master': true, 'status': 'success', 'last_update': '2020-07-21 23:51:03 +0800', 'last_update_ts': 1595346663, 'last_started': '2020-07-21 23:39:39 +0800', 'last_started_ts': 1595345979, 'last_ended': '2020-07-21 23:51:03 +0800', 'last_ended_ts': 1595346663, 'next_schedule': '2020-07-22 05:51:03 +0800', 'next_schedule_ts': 1595368263, 'upstream': 'rsync://msync.centos.org/CentOS/', 'size': '300G' },
          { 'name': 'ubuntuttttttttttt-ttttttttttest', 'is_master': true, 'status': 'success', 'last_update': '2020-07-22 01:15:17 +0800', 'last_update_ts': 1595351717, 'last_started': '2020-07-21 22:09:24 +0800', 'last_started_ts': 1595340564, 'last_ended': '2020-07-22 01:15:17 +0800', 'last_ended_ts': 1595351717, 'next_schedule': '2020-07-22 07:15:17 +0800', 'next_schedule_ts': 1595373317, 'upstream': 'rsync://archive.ubuntu.com/ubuntu/', 'size': '1.41T' },
          { 'name': 'pypi', 'is_master': true, 'status': 'syncing', 'last_update': '2020-07-21 19:06:25 +0800', 'last_update_ts': 1595329585, 'last_started': '2020-07-21 19:11:29 +0800', 'last_started_ts': 1595329889, 'last_ended': '2020-07-21 19:06:25 +0800', 'last_ended_ts': 1595329585, 'next_schedule': '0001-01-01 00:00:00 +0000', 'next_schedule_ts': -62135596800, 'upstream': 'https://pypi.python.org/', 'size': '7.17T' },
          { 'name': 'centos', 'is_master': true, 'status': 'success', 'last_update': '2020-07-21 23:51:03 +0800', 'last_update_ts': 1595346663, 'last_started': '2020-07-21 23:39:39 +0800', 'last_started_ts': 1595345979, 'last_ended': '2020-07-21 23:51:03 +0800', 'last_ended_ts': 1595346663, 'next_schedule': '2020-07-22 05:51:03 +0800', 'next_schedule_ts': 1595368263, 'upstream': 'rsync://msync.centos.org/CentOS/', 'size': '300G' }
        ]
      })
      .then(resp => {
        this.mirrorData = (resp.data as MirrorItem[])
      })

    this.$axios
      .get(
        `${
          process.env.NODE_ENV === 'production'
            ? window.location.origin
            : baseURL
        }/static/proxies.json`
      )
      .catch(err => {
        console.log(err)
        this.proxyData = [
          { 'name': 'pypi', 'is_master': true, 'status': 'syncing', 'last_update': '2020-07-21 19:06:25 +0800', 'last_update_ts': 1595329585, 'last_started': '2020-07-21 19:11:29 +0800', 'last_started_ts': 1595329889, 'last_ended': '2020-07-21 19:06:25 +0800', 'last_ended_ts': 1595329585, 'next_schedule': '0001-01-01 00:00:00 +0000', 'next_schedule_ts': -62135596800, 'upstream': 'https://pypi.python.org/', 'size': '7.17T' },
          { 'name': 'AUR', 'is_master': true, 'status': 'syncing', 'last_update': '2020-07-21 19:06:25 +0800', 'last_update_ts': 1595329585, 'last_started': '2020-07-21 19:11:29 +0800', 'last_started_ts': 1595329889, 'last_ended': '2020-07-21 19:06:25 +0800', 'last_ended_ts': 1595329585, 'next_schedule': '0001-01-01 00:00:00 +0000', 'next_schedule_ts': -62135596800, 'upstream': 'https://aur.archlinux.org', 'size': '7.17T', 'url': 'https://aur.redrock.team' }
        ]
      })
      .then(resp => {
        this.proxyData = resp.data
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
