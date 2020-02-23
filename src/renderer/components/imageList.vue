<template lang="pug">
.clipList
  .item(v-for="(i,n) in textClipList" :key="n")
    .content {{i.text | abstract}}

</template>

<script>
const { ipcRenderer, remote, clipboard } = require('electron')
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['textClipList', 'lastTextClip'])
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
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
@import url('../style/clipList.less');
</style>
