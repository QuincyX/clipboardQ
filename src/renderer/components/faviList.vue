<template lang="pug">
.clipList
  .item(v-for="(i,n) in faviClipList" :key="n" :class="activeIndex==n?'activeItem':''" )
    .content(@click="handleCopy(i)") {{i.text}}
    .actionBar
      i.el-icon-star-on(v-if="i.star" @click="handleUnStar(i._id)")
      i.el-icon-star-off(v-else @click="handleStar(i._id)")
      i.el-icon-delete(@click="handleDelete(i._id)")

</template>

<script>
const { ipcRenderer, remote, clipboard } = require('electron')
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeIndex: -1
    }
  },
  computed: {
    ...mapGetters(['faviClipList'])
  },
  filters: {
    abstract(val) {
      if (val.length > 15) {
        return val.slice(0, 15)
      } else {
        return val
      }
    }
  },
  methods: {
    handleClear() {
      this.$clipboard.stopWatch()
      this.$clipboard.clear('textClip')
    },
    async handleDelete(id) {
      await this.$store.dispatch('deleteClip', id)
    },
    async handleStar(id) {
      await this.$store.dispatch('starClip', id)
    },
    async handleUnStar(id) {
      await this.$store.dispatch('unStarClip', id)
    },
    handleCopy(item) {
      clipboard.writeText(item.text)
      this.$message.success('已复制到剪切板')
    },
    handleShow(n) {
      this.activeIndex = n
    },
    handleHide(n) {
      this.activeIndex = -1
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
@import url('../style/clipList.less');
</style>
