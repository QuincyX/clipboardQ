<template lang="pug">
.aboutContainer
  .info
    p QuincyX ©2018-2020
    p All Rights Received.

</template>

<script>
const { ipcRenderer, remote, clipboard } = require('electron')
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isRunning: true
    }
  },
  computed: {
    ...mapGetters(['textClipList', 'lastTextClip'])
  },
  methods: {
    handleChangeIsRunning(val) {
      if (val) {
        this.$clipboard.startWatch()
      } else {
        this.$clipboard.stopWatch()
      }
    },
    handleClear() {
      this.$clipboard.clear('textClip')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.aboutContainer {
  padding: 10px;
  .info {
    text-align: center;
    line-height: 2;
  }
}
</style>
