<template>
  <div class="ztree" :id="ztreeId"></div>
</template>

<script>
// import * as $ from 'jquery'

import $ from 'jquery'
if (!window.jQuery) {
  window.jQuery = $
}
import { getComponentInstance } from './getComponent'
import { DEFAULT_SETTING } from './defaultSetting'
import merge from 'lodash/merge'
console.log(DEFAULT_SETTING)
require('ztree/js/jquery.ztree.all')
// require("ztree/js/jquery.ztree.core");
require('ztree/js/jquery.ztree.exhide')
// require('./font/iconfont.css')
// require("ztree/css/zTreeStyle/zTreeStyle.css");
export default {
  name: 'Tree',
  components: {},
  props: {
    setting: {
      type: Object,
      require: false,
      default: function() {
        return {}
      },
    },
    data: {
      type: Array,
      require: true,
      default: function() {
        return []
      },
    },
    // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },

    // 是否默认全部展开
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // element: 默认选中的节点  ztree: 勾选 或 取消勾选 单个节点
    defaultCheckedKeys: {
      type: Array,
      default: () => [],
    },
    // 自定义树节点的内容
    renderContent: {
      type: Object,
      default: () => {},
    },
    // 节点是否可被选择
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    // 是否开启拖拽节点功能
    draggable: {
      type: Boolean,
      default: false,
    },
    // 对树节点进行筛选时的文本
    filterText: {
      type: String,
      default: '',
    },
    // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    filterNodeMethod: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      ztreeId: 'ztree_' + parseInt(Math.random() * 1e10),
      ztreeObj: null,
      ztreeNoDataId: 'ztree_no_data',
      ztreeNoDataText: '暂无数据',
      list: [],
      ztreeSetting: {
        ...DEFAULT_SETTING,
        callback: {
          onAsyncError: (...arg) => {
            this.$emit('loadNodeError', ...arg)
          },
          onAsyncSuccess: (...arg) => {
            this.$emit('loadNodeSuccess', ...arg)
          },
          onCheck: (...arg) => {
            this.$emit('check-change', ...arg)
          },
          onClick: (...arg) => {
            const [event, treeId, treeNode] = [...arg]
            // expandOnClickNode
            if (this.expandOnClickNode) {
              this.ztreeObj.expandNode(treeNode)
            }
            this.$emit('node-click', ...arg)
          },
          onCollapse: (...arg) => {
            this.$emit('node-collapse', ...arg)
          },
          onDblClick: (...arg) => {
            this.$emit('onDblClick', ...arg)
          },
          onDrag: (...arg) => {
            this.$emit('onDrag', ...arg)
          },
          onDragMove: (...arg) => {
            this.$emit('onDragMove', ...arg)
          },
          //
          /**
           * 用于捕获节点拖拽操作结束的事件回调函数
           * @param {Object} event 标准的 js event 对象  treeId [String]  treeNodes[Array(JSON)]  被拖拽的节点 JSON 数据集合
           * targetNode [JSON] 成为 treeNodes 拖拽结束的目标节点 JSON 数据对象。
           * moveType  [String]  指定移动到目标节点的相对位置
           * isCopy  [Boolean] 拖拽节点操作是 复制 或 移动  true：复制；false：移动
           */
          onDrop: (...arg) => {
            this.$emit('node-drag-end', ...arg)
          },
          onExpand: (...arg) => {
            this.$emit('node-expand', ...arg)
          },
          onMouseDown: (...arg) => {
            this.$emit('onMouseDown', ...arg)
          },
          onMouseUp: (...arg) => {
            this.$emit('onMouseUp', ...arg)
          },
          // 用于捕获删除节点之后的事件回调函数。
          onRemove: (...arg) => {
            this.$emit('onRemove', ...arg)
          },
          onRename: (...arg) => {
            this.$emit('onRename', ...arg)
          },
          onRightClick: (...arg) => {
            this.$emit('node-contextmenu', ...arg)
          },
        },
      },
    }
  },
  computed: {},

  watch: {
    data: {
      handler: function(newVal) {
        this.list = newVal

        // update tree
        if (this.ztreeObj) {
          this.ztreeObj.destroy()
        }
        const _this = this
        const ztreeObj = this.ztreeObj
        this.$nextTick(() => {
          let reSetting = this.setting

          if (this.showCheckbox) {
            reSetting = merge(reSetting, {
              check: {
                enable: true,
                chkStyle: 'checkbox',
              },
            })
          } else {
            reSetting = merge(reSetting, {
              check: {
                enable: false,
              },
            })
          }
          if (this.draggable) {
            reSetting = merge(reSetting, {
              edit: {
                enable: true,
                drag: {
                  isCopy: false,
                  isMove: true,
                },
                showRenameBtn: false,
                showRemoveBtn: false,
              },
            })
          } else {
            reSetting = merge(reSetting, {
              edit: {
                enable: false,
              },
            })
          }

          if (this.renderContent && this.renderContent.render) {
            const { render } = this.renderContent
            reSetting = merge(reSetting, {
              view: {
                addDiyDom: function(treeId, treeNode) {
                  const instance = getComponentInstance(render, {
                    getZtreeobj: () => {
                      return _this.ztreeObj
                    },
                    treeId,
                    treeNode,
                  })
                  const div = document.createElement('div')
                  document.getElementById(treeNode.tId + '_a').appendChild(div)
                  instance.$mount(div)
                },
              },
            })
          }
          this.ztreeObj = $.fn.zTree.init(
            $('#' + this.ztreeId),
            merge(this.ztreeSetting, reSetting),
            this.list
          )

          this.$emit('onCreated', this.ztreeObj)

          // 是否展开全部
          this.ztreeObj.expandAll(this.defaultExpandAll)

          // 存在选中的值就默认选中
          const needChecked = Array.from(this.defaultCheckedKeys)

          // const nodes = this.ztreeObj.getNodes();

          // ztreeObj.checkNode(nodes[0], true, true);
          if (needChecked && needChecked.length > 0) {
            // 找到需要选中的node
            for (let i = 0, l = needChecked.length; i < l; i++) {
              ztreeObj.checkNode(needChecked[i], true, true)
            }
          }
        })
      },
      deep: true,
      immediate: true,
    },
    filterText(val) {
      // filterNodeMethod
      if (this.filterNodeMethod) {
        if (val) {
          const nodes = this.ztreeObj.getNodesByFilter(node => {
            return node.name.indexOf(val) > -1
          })
          const rootNodes = this.ztreeObj.getNodes()
          this.ztreeObj.showNodes(rootNodes)
          $(`#${this.ztreeNoDataId}`).remove()
          if (nodes.length > 0) {
            this.ztreeObj.hideNodes(rootNodes[0].children)
            // showNodes只会查询到最外层符合查询条件的node
            this.ztreeObj.showNodes(nodes)
            // 默认展开一级
            this.ztreeObj.expandNode(rootNodes[0], true, false)
          } else {
            this.ztreeObj.hideNodes(rootNodes)
            if ($(`#${this.ztreeNoDataId}`).length === 0) {
              $('#' + this.ztreeId).append(
                `<div id="${this.ztreeNoDataId}">${this.ztreeNoDataText}</div>`
              )
            }
          }
          this.filterNodeMethod(nodes)
        }
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loadMethods()
    })
  },
  methods: {
    // 加载method
    loadMethods() {
      // 若节点可被选择 获取所有选中的节点
      this.ztreeObj.getCheckedNodes = this.ztreeObj.getSelectedNodes
      // 设置目前勾选的节点
      /***
       * @params treeNode  需要被选中的节点数据  JSON  请务必保证此节点数据对象 是 zTree 内部的数据对象
       */
      this.ztreeObj.setCheckedNodes = this.ztreeObj.selectNode
      // 通过 key / data 设置某个节点的勾选状态
      /***
       * @params treeNode       JSON       需要勾选 或 取消勾选 的节点数据    请务必保证此节点数据对象 是 zTree 内部的数据对象
       *         checked        Boolean    checked = true 表示勾选节点  checked = false 表示节点取消勾选    省略此参数，则根据对此节点的勾选状态进行 toggle 切换,不影响 treeNode.nocheck = true 的节点。
       *         checkTypeFla   gBoolean   checkTypeFlag  = true 表示按照 setting.check.chkboxType 属性进行父子节点的勾选联动操作  checkTypeFlag  = false 表示只修改此节点勾选状态，无任何勾选联动操作
       *         callbackFlagBoolean
                                callbackFlag = true 表示执行此方法时触发 beforeCheck & onCheck 事件回调函数
                                callbackFlag = false 表示执行此方法时不触发事件回调函数

省略此参数，等同于 false
       */
      this.ztreeObj.setChecked = this.ztreeObj.checkNode
      // 根据 data 或者 key 拿到 Tree 组件中的 node
      this.ztreeObj.getNode = this.ztreeObj.getNodesByFilter
    },
  },
}
</script>
<style scoped>
/* beauty ztree! */
.ztree {
  font-size: 14px;
  text-align: left;
}
.ztree >>> li {
  white-space: nowrap;
  list-style-type: none;
  outline: none;
}
.ztree >>> li ul {
  position: relative;
  padding: 0 0 0 20px;
  margin: 0;
}
.ztree >>> .line:before {
  position: absolute;
  top: 0;
  left: 10px;
  height: 100%;
  border-right: 1px dotted #dbdbdb;
  content: '';
}
.ztree >>> .roots_docu:before,
.ztree >>> .roots_docu:after,
.ztree >>> .center_docu:before,
.ztree >>> .bottom_docu:before,
.ztree >>> .center_docu:after,
.ztree >>> .bottom_docu:after {
  position: absolute;
  border: 0 dotted #dbdbdb;
  content: '';
}
.ztree >>> .roots_docu:before {
  top: 50%;
  left: 10px;
  height: 50%;
  border-left-width: 1px;
}
.ztree >>> .roots_docu:after {
  top: 50%;
  left: 11px;
  width: 50%;
  border-top-width: 1px;
}
.ztree >>> .center_docu:before {
  left: 10px;
  height: 100%;
  border-left-width: 1px;
}
.ztree >>> .center_docu:after {
  top: 50%;
  left: 11px;
  width: 50%;
  border-top-width: 1px;
}
.ztree >>> .bottom_docu:before {
  left: 10px;
  height: 50%;
  border-left-width: 1px;
}
.ztree >>> .bottom_docu:after {
  top: 50%;
  left: 11px;
  width: 50%;
  border-top-width: 1px;
}
.ztree >>> li a {
  display: inline-block;
  height: 22px;
  margin: 0;
  line-height: 22px;

  /* color: #555; */
  vertical-align: middle;
  cursor: pointer;
  transition: none;
}
.ztree >>> .node_name {
  display: inline-block;
  padding: 0 3px;
  border-radius: 4px;
}
.ztree >>> .curSelectedNode .node_name {
  color: #000;
  background-color: #c9e9f7;
}
.ztree >>> .curSelectedNode_Edit {
  height: 20px;
  color: #000;
  background-color: #9dd6f0;
  border: 1px #6cc2e8 solid;
  opacity: 0.8;
}
.ztree >>> .tmpTargetNode_inner {
  color: #fff;
  background-color: #4fcbf0;
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.ztree >>> .rename {
  width: 80px;
  height: 22px;
  padding: 0;
  margin: 0;
  font-size: 12px;
  line-height: 22px;
  vertical-align: top;
  background: none;
  border: 0;
}
.ztree >>> .button {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
.ztree >>> .button.ico_open,
.ztree >>> .button.ico_close {
  /* border: 1px solid #bdbdbd; */
}
.ztree >>> .button.edit {
  color: #25ae88;
  background: url('./img/edit.png') no-repeat center center;
}
.ztree >>> .button.remove {
  color: #cb4042;
  background: url('./img/delete.png') no-repeat center center;
}
.ztree >>> .button.chk {
  position: relative;
  width: 14px;
  height: 14px;
  margin: 0 4px 0 0;
  background: #fff;
  border: 1px solid #d7dde4;
  border-radius: 2px;
}
.ztree >>> .chk.radio_true_full,
.ztree >>> .chk.radio_false_full,
.ztree >>> .chk.radio_true_full_focus,
.ztree >>> .chk.radio_false_full_focus,
.ztree >>> .chk.radio_false_disable,
.ztree >>> .chk.radio_true_disable,
.ztree >>> .chk.radio_true_part,
.ztree >>> .chk.radio_false_part,
.ztree >>> .chk.radio_true_part_focus,
.ztree >>> .chk.radio_false_part_focus {
  border-radius: 8px;
}
.ztree >>> .button.chk:after {
  position: absolute;
  top: 1px;
  left: 4px;
  width: 4px;
  height: 8px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  content: '';
  -webkit-transform: rotate(0deg) scale(0);
  transform: rotate(0deg) scale(0);
  transition: -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
}
.ztree >>> .button.checkbox_false_full_focus {
  border-color: #ccc;
}
.ztree >>> .button.checkbox_true_full,
.ztree >>> .button.checkbox_true_full_focus,
.ztree >>> .button.checkbox_true_part,
.ztree >>> .button.checkbox_true_part_focus,
.ztree >>> .button.checkbox_true_disable {
  background-color: #39f;
  border-color: #39f;
}
.ztree >>> .button.checkbox_true_full:after,
.ztree >>> .button.checkbox_true_full_focus:after,
.ztree >>> .button.checkbox_true_disable:after {
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
}
.ztree >>> .button.checkbox_true_part:after,
.ztree >>> .button.checkbox_true_part_focus:after {
  top: 5px;
  left: 2px;
  width: 10px;
  height: 1px;
  border-right: 0;
  -webkit-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
}
.ztree >>> .button.radio_true_full,
.ztree >>> .chk.radio_true_full_focus,
.ztree >>> .chk.radio_true_part,
.ztree >>> .chk.radio_true_part_focus {
  border-color: #39f;
}
.ztree >>> .button.radio_true_full:after,
.ztree >>> .chk.radio_true_full_focus:after,
.ztree >>> .chk.radio_true_part:after,
.ztree >>> .chk.radio_true_part_focus:after {
  top: 3px;
  left: 3px;
  width: 8px;
  background: #39f;
  border: 0;
  border-radius: 4px;
  -webkit-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
}
.ztree >>> .button.checkbox_true_disable,
.ztree >>> .button.checkbox_false_disable,
.ztree >>> .chk.radio_false_disable,
.ztree >>> .chk.radio_true_disable {
  cursor: not-allowed;
}
.ztree >>> .button.checkbox_false_disable {
  background-color: #f3f3f3;
}
.ztree >>> .button.noline_close:before,
.ztree >>> .button.noline_open:before,
.ztree >>> .button.root_open:before,
.ztree >>> .button.root_close:before,
.ztree >>> .button.roots_open:before,
.ztree >>> .button.roots_close:before,
.ztree >>> .button.bottom_open:before,
.ztree >>> .button.bottom_close:before,
.ztree >>> .button.center_open:before,
.ztree >>> .button.center_close:before {
  position: absolute;
  top: 5px;
  left: 5px;
  border: 6px solid;
  border-color: transparent transparent transparent #fff;
  content: '';
  -webkit-transform: rotateZ(0deg);
  transform: rotateZ(0deg);
  transition: -webkit-transform ease 0.3s;
  transition: transform ease 0.3s;
  transition: transform ease 0.3s, -webkit-transform ease 0.3s;
  -webkit-transform-origin: 25% 50%;
  transform-origin: 25% 50%;
}
.ztree >>> .button.noline_open:before,
.ztree >>> .button.root_open:before,
.ztree >>> .button.roots_open:before,
.ztree >>> .button.bottom_open:before,
.ztree >>> .button.center_open:before {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
.ztree >>> .button.ico_loading {
  margin-right: 2px;
  background: url('data:image/gif;base64,R0lGODlhEAAQAKIGAMLY8YSx5HOm4Mjc88/g9Ofw+v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAGACwAAAAAEAAQAAADMGi6RbUwGjKIXCAA016PgRBElAVlG/RdLOO0X9nK61W39qvqiwz5Ls/rRqrggsdkAgAh+QQFCgAGACwCAAAABwAFAAADD2hqELAmiFBIYY4MAutdCQAh+QQFCgAGACwGAAAABwAFAAADD1hU1kaDOKMYCGAGEeYFCQAh+QQFCgAGACwKAAIABQAHAAADEFhUZjSkKdZqBQG0IELDQAIAIfkEBQoABgAsCgAGAAUABwAAAxBoVlRKgyjmlAIBqCDCzUoCACH5BAUKAAYALAYACgAHAAUAAAMPaGpFtYYMAgJgLogA610JACH5BAUKAAYALAIACgAHAAUAAAMPCAHWFiI4o1ghZZJB5i0JACH5BAUKAAYALAAABgAFAAcAAAMQCAFmIaEp1motpDQySMNFAgA7')
    0 center no-repeat;
}
.ztree >>> .tmpTargetzTree {
  background-color: #2ea9df;
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.ztree >>> .tmpzTreeMove_arrow {
  position: absolute;
  width: 18px;
  height: 18px;
  color: #4fcbf0;
}
.ztree >>> .ztree.zTreeDragUL {
  position: absolute;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #dbdbdb;
  border: 1px #176b53 dotted;
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.zTreeMask {
  position: absolute;
  z-index: 10000;
  background-color: #cfcfcf;
  opacity: 0;
  filter: alpha(opacity=0);
}
</style>
