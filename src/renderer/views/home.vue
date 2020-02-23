<template lang="pug">
.main
  .header
    .title {{activeTab}}
    //- .btn(@click="handleClose")
    //-   i.el-icon-close
  .menu
    .item(:class="activeTab=='最近的剪切板'?'active':''"  @click="activeTab='最近的剪切板'")
      i.el-icon-time
      .text 列表
    .item(:class="activeTab=='收藏的剪切板'?'active':''"  @click="activeTab='收藏的剪切板'")
      i.el-icon-star-off
      .text 收藏
    .item(:class="activeTab=='设置'?'active':''"  @click="activeTab='设置'")
      i.el-icon-setting
      .text 设置
    .item.bottomItem(:class="activeTab=='关于'?'active':''"  @click="activeTab='关于'")
      i.el-icon-question
      .text 关于
  .container
    recent-list(v-if="activeTab=='最近的剪切板'")
    favi-list(v-else-if="activeTab=='收藏的剪切板'")
    setting(v-else-if="activeTab=='设置'")
    about(v-else-if="activeTab=='关于'")

</template>

<script>
const { ipcRenderer, remote } = require('electron')
import { mapGetters } from 'vuex'
import RecentList from '@/components/recentList'
import FaviList from '@/components/faviList'
import Setting from '@/components/setting'
import About from '@/components/about'
export default {
  components: { RecentList, FaviList, Setting, About },
  data() {
    return {
      activeTab: '最近的剪切板'
    }
  },
  computed: {
    ...mapGetters(['textClipList', 'lastTextClip'])
  },
  methods: {
    handleClose() {},
    handleResize() {}
  },
  created() {},
  mounted() {
    ipcRenderer.on('activeTab', (event, val) => {
      this.activeTab = val
    })
  }
}
</script>
<style lang="less" scoped>
@menuWid: 60px;
@headerHeight: 30px;

.menu {
  position: fixed;
  left: 0;
  top: 0;
  width: @menuWid;
  bottom: 0;
  background: @dark;
  color: #fff;
  overflow: hidden;
  .item {
    cursor: pointer;
    text-align: center;
    line-height: 50px;
    height: 50px;
    font-size: 18px;
    width: @menuWid * 2;
    transition: all ease-in 0.3s;
    i,
    .text {
      display: inline-block;
      width: @menuWid;
    }
    .text {
      font-size: 13px;
    }
    &:hover {
      background: @c1;
      margin-left: -@menuWid;
    }
    &.active {
      background: @c1;
    }
    &.bottomItem {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .home {
    cursor: pointer;
    text-align: center;
    line-height: 50px;
    height: 50px;
    font-size: 18px;
    &:hover {
      background: @c1;
    }
  }
}
.header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding-left: @menuWid;
  height: @headerHeight;
  line-height: @headerHeight;
  background: @dark;
  color: @light;
  font-size: 13px;
  .title {
    display: inline-block;
    width: calc(~'100% - 65px');
    -webkit-app-region: drag;
    padding-left: 15px;
    text-align: center;
  }
  .btn {
    width: 50px;
    text-align: center;
    cursor: pointer;
    float: right;
    &:hover {
      background: @c2;
    }
  }
}
.container {
  margin-left: @menuWid;
  background: @bg1;
  margin-top: @headerHeight;
  height: calc(100vh - @headerHeight);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background-color: @c1;
    border-radius: 10px;
  }
}
</style>
