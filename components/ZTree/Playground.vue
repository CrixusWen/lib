<template>
  <div class="tree-cont">
    <input type="text" placeholder="输入关键字进行过滤" v-model="filterText" />
    <tree
      ref="tree"
      :setting="setting"
      :data="nodes"
      :default-expand-all="expand"
      :expand-on-click-node="true"
      show-checkbox
      :draggable="true"
      :default-checked-keys="checkedKeys"
      :render-content="renderContent"
      :filter-text="filterText"
      :filter-node-method="filerNode"
      @node-click="handleClick"
      @node-contextmenu="handleNodeContextmenu"
      @check-change="handleCheck"
      @node-expand="handleExpand"
      @node-collapse="handleCollapse"
      @loadNodeError="handleLoadNodeError"
      @loadNodeSuccess="handleLoadNodeSuccess"
      @onCreated="handleCreated"
    ></tree>
  </div>
</template>

<script>
import TreeComp from './TreeCustomeComponent'
const bigData = require('./mock/big-tree.json')
// console.log(bigData.data);
const simpleData = [
  { id: 1, pid: 0, name: '随意勾选 1', open: true },
  { id: 11, pid: 1, name: '随意勾选 1-1', open: true },
  { id: 111, pid: 11, name: '随意勾选 1-1-1' },
  { id: 112, pid: 11, name: '随意勾选 1-1-2' },
  { id: 12, pid: 1, name: '随意勾选 1-2', open: true },
  { id: 121, pid: 12, name: '随意勾选 1-2-1' },
  { id: 122, pid: 12, name: '随意勾选 1-2-2' },
  { id: 2, pid: 0, name: '随意勾选 2', open: true },
  { id: 21, pid: 2, name: '随意勾选 2-1' },
  { id: 22, pid: 2, name: '随意勾选 2-2', open: true },
  { id: 221, pid: 22, name: '随意勾选 2-2-1' },
  { id: 222, pid: 22, name: '随意勾选 2-2-2' },
  { id: 23, pid: 2, name: '随意勾选 2-3' },
]
const dataQueue = [bigData.data, simpleData]
const getUrl = './api/mock/big-tree.json'

import Tree from './index'
export default {
  name: 'TreeCont',
  components: { Tree },
  data() {
    return {
      showIndex: 0,
      expand: false,
      ztreeObj: null,
      filterText: '',
      // 选中的值 格式是ztree的对象格式
      checkedKeys: [],
      // 树节点自定义内容
      renderContent: {
        render: TreeComp,
      },
      setting: {
        // 异步获取数据 需设置为true url为请求数据地址
        check: {
          chkboxType: { Y: '', N: 'ps' },
        },
      },
    }
  },
  computed: {
    nodes: function() {
      return dataQueue[this.showIndex]
    },
  },
  watch: {},
  methods: {
    handleLoadNodeError: (
      event,
      treeId,
      treeNode,
      XMLHttpRequest,
      textStatus,
      errorThrown
    ) => {
      console.log(
        event,
        treeId,
        treeNode,
        XMLHttpRequest,
        textStatus,
        errorThrown
      )
      //    event,treeId, treeNode, XMLHttpRequest, textStatus, errorThrown;
    },
    handleLoadNodeSuccess: () => {
      // event, treeId, treeNode, msg
    },
    handleClick: function(evt, treeId, treeNode) {
      // 点击事件
      console.log(evt.type, treeNode)
    },
    handleCheck: function(evt, treeId, treeNode) {
      // 选中事件
      console.log(evt.type, treeNode)
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj
      // console.log(this.$refs);
    },
    update: function() {
      // 更新示例数据
      this.showIndex = this.showIndex === 0 ? 1 : 0
    },
    // 当某一节点被鼠标右键点击时会触发该事件
    handleNodeContextmenu(evt, treeId, treeNode) {
      console.log(evt.type, treeId, treeNode)
    },
    // 用于捕获节点被展开的事件回调函数
    handleExpand(evt, treeId, treeNode) {
      console.log(evt.type, treeId, treeNode)
    },
    // 用于捕获节点被折叠的事件回调函数
    handleCollapse(evt, treeId, treeNode) {
      console.log(evt.type, treeId, treeNode)
    },
    test() {
      this.checkedKeys = [this.ztreeObj.getNodes()[0]]
    },
    filerNode(nodes) {
      console.log(nodes)
    },
  },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.tree-cont {
  text-align: center;
}
</style>
