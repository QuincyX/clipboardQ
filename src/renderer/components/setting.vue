<template lang="pug">
.settingList
  el-form(label-width="100px")
    el-form-item(label="监听剪切板")
      el-switch(v-model="isRunning" @change="handleChangeIsRunning")
      .switchText {{isRunning?'监听中...':''}}
    el-form-item(label="缓存")
      el-button(type="danger" size="mini") 清除最近列表
      el-button(type="danger" size="mini" @click="handleClear") 清除全部列表
    el-form-item(label="")
      el-button(type="default" size="mini") 退出

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
.settingList {
  padding: 10px;
  .switchText {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
  }
}
</style>
