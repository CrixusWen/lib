<template>
  <div class="tree-select" :class="selectClass">
    <el-select
      class="tree-select-input"
      popper-class="select-option"
      ref="select"
      v-bind="bindSelectProps"
      v-model="labels"
      v-popover:popover
      :style="selectInputStyle"
      :disabled="disabled"
      :popper-append-to-body="false"
      :filterable="false"
      :multiple="multiple || bindSelectProps.multiple"
      @remove-tag="handleRemoveTag"
      @clear="handleClear"
    >
    </el-select>
    <el-popover
      :disabled="disabled"
      ref="popover"
      :placement="placement"
      :popper-class="popperCls"
      :width="poperWidth || selectsWidth"
      :visible-arrow="false"
      v-model="visible"
      trigger="click"
    >
      <el-scrollbar
        tag="div"
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
        class="is-empty"
      >
        <!-- 树列表 -->
        <tree
          ref="tree"
          v-model="ids"
          :show-checkbox="multiple"
          :expand-on-click-node="false"
          :filterable="filterable"
          :data="data"
          :emit-parent="emitParent"
          :emit-children="emitChildren"
          @node-click="handleNodeClick"
          v-bind="bindTreeProps"
        >
          <template slot-scope="{ node, data: nodeData }">
            <span class="custom-tree-node" :ref="nodeData[propsValue]">
              {{ node.label }}
            </span>
          </template>
        </tree>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script>
import Tree from '../Tree'

const defaultSelectProps = {
  'collapse-tags': true,
  clearable: true,
  disabled: false,
  placeholder: '请选择',
}

const defaultTreeProps = {
  data: [],
  'node-key': 'id',
  props: {
    children: 'children',
    label: 'label',
    disabled: 'disabled',
  },
}

export default {
  name: 'TreeSelect',
  components: {
    Tree,
  },
  props: {
    // v-model值
    value: {
      type: [String, Array, Number],
      default() {
        return ''
      },
    },
    // Tree的data
    data: {
      type: Array,
      default: () => [],
    },
    // 是否允许多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 选择器外部容器class
    selectClass: {
      type: String,
      default: '',
    },
    // 选择框自定义style
    selectInputStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    // 是否禁用选择框
    disabled: {
      type: Boolean,
      // false
      default() {
        return false
      },
    },
    // 选择框自定义Props
    selectProps: {
      type: Object,
      default() {
        return defaultSelectProps
      },
    },
    // 树组件自定义Props
    treeProps: {
      type: Object,
      default() {
        return defaultTreeProps
      },
    },
    // 弹出框位置
    placement: {
      type: String,
      default: 'bottom',
    },
    // 为 popper 添加类名
    popperClass: {
      type: String,
      default() {
        return ''
      },
    },
    // 是否抛出父元素值
    emitParent: {
      type: Boolean,
      default: true,
    },
    // 是否抛出子元素值
    emitChildren: {
      type: Boolean,
      default: true,
    },
    // 是否开启搜索
    filterable: {
      type: Boolean,
      default: false,
    },
    poperWidth: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      labels: '',
      ids: '',
      visible: false,
      selectsWidth: null, // 默认150，会计算Select的宽度进行自适应
    }
  },
  computed: {
    popperCls() {
      let cls = 'tree-select-popper ' + this.popperClass
      return this.disabled ? cls + ' disabled ' : cls
    },
    propsValue() {
      return this.bindTreeProps && this.bindTreeProps['node-key']
        ? this.bindTreeProps['node-key']
        : 'id'
    },
    propsLabel() {
      return this.bindTreeProps &&
        this.bindTreeProps.props &&
        this.bindTreeProps.props.label
        ? this.bindTreeProps.props.label
        : 'label'
    },
    propsChildren() {
      return this.bindTreeProps &&
        this.bindTreeProps.props &&
        this.bindTreeProps.props.children
        ? this.bindTreeProps.props.children
        : 'children'
    },
    isMultiple() {
      return this.multiple || this.bindSelectProps.multiple
    },
    bindTreeProps() {
      return {
        ...defaultTreeProps,
        ...(this.treeProps || {}),
      }
    },
    bindSelectProps() {
      return {
        ...defaultSelectProps,
        ...(this.selectProps || {}),
      }
    },
  },
  watch: {
    ids(value) {
      this._updateSelect()
      if (JSON.stringify(value) !== JSON.stringify(this.value)) {
        this._emitFun()
      }
    },
    value: {
      immediate: true,
      handler(val) {
        if (this.ids !== val) {
          if (this.isMultiple) {
            this.ids = [...val]
          } else {
            this.ids = val
          }
        }
      },
    },
    data() {
      this._updateSelect()
    },
    visible(val) {
      val && this.scrollIntoCheckedOption()
    },
  },
  mounted() {
    this._updateSelectsWidth()
    this._updateLabels()
  },
  methods: {
    // 滚动到勾选选项
    scrollIntoCheckedOption() {
      const fistCheckedId = this.ids
        ? Array.isArray(this.ids) && this.ids.length
          ? this.ids[0]
          : this.ids
        : ''
      if (fistCheckedId) {
        this.$nextTick(() => {
          const $firstCheckedOptionEl = this.$refs[fistCheckedId]
          $firstCheckedOptionEl &&
            $firstCheckedOptionEl.scrollIntoView({ behavior: 'smooth' })
        })
      }
    },
    handleNodeClick() {
      // 单选模式，选择数据后隐藏面板
      if (!this.multiple) {
        this.visible = false
      }
    },
    // 获取EL-Tree实例
    getElTree() {
      const Tree = this.$refs['tree'] // 自定义Tree组件实例
      return Tree ? Tree.$refs['tree'] : null // El-Tree实例
    },

    // 获取勾选节点
    getCheckedNodes() {
      const elTree = this.getElTree()

      if (!elTree) {
        return []
      }

      const checkedNodes = elTree.getCheckedNodes()

      return checkedNodes.filter(checkedNode => {
        if (checkedNode.children) {
          return this.emitParent
        } else {
          return this.emitChildren
        }
      })
    },

    // 获取勾选节点对应数据
    getIds() {
      const checkedNodes = this.getCheckedNodes()
      return checkedNodes.map(node => node[this.propsValue])
    },

    // 获取回填到Select中的label值
    getLabels() {
      const checkedNodes = this.getCheckedNodes()
      return checkedNodes.map(item => item[this.propsLabel])
    },

    // 更新Poper的宽度自适应Select
    _updateSelectsWidth() {
      this.$nextTick(() => {
        this.selectsWidth = this.$refs.select.$el.getBoundingClientRect().width
      })
    },

    // 更新选择
    _updateSelect() {
      this._updateTreeSelect() // 先更新树选择
      this.$nextTick(() => {
        this._updateLabels() // 再获取树选中label
      })
    },

    // 更新输入框值
    _updateLabels() {
      const labels = this.getLabels()
      if (this.isMultiple) {
        this.labels = labels || []
      } else {
        this.labels = labels && labels.length ? labels[0] : ''
      }
    },

    // 更新树选择
    _updateTreeSelect() {
      const elTree = this.getElTree()
      if (!elTree) {
        return
      }
      let ids = []
      if (this.isMultiple) {
        ids = this.ids
      } else {
        ids = this.ids ? [this.ids] : []
      }
      elTree.setCheckedKeys(ids)
    },

    // 抛出更新后的值
    _emitFun() {
      this.$emit('input', this.isMultiple ? [...this.ids] : this.ids)
    },

    // 处理删除tag
    handleRemoveTag(tag) {
      const elTree = this.getElTree()
      if (!elTree) {
        return
      }
      const { propsValue, propsLabel } = this
      const checkedNodes = this.getCheckedNodes()
      const node = checkedNodes.find(item => item[propsLabel] === tag)
      const id = node[propsValue]

      // 将树中对应节点反勾选，并递归应用子节点，参考：https://element.eleme.cn/#/zh-CN/component/tree#fang-fa 中setChecked的用法
      elTree.setChecked(id, false, true)

      this.$nextTick(() => {
        // 下一个时钟周期中获取到反勾选后的勾选数据，并抛出
        this.ids = this.getIds()
        this._emitFun()
        this.$emit('removeTag', this.ids, tag)
      })
    },

    // 处理清空操作
    handleClear() {
      this.ids = this.isMultiple ? [] : ''
      this._emitFun()
      this.$emit('select-clear')
    },
  },
}
</script>

<style lang="scss" scoped>
.tree-select {
  display: inline-block;
}
.tree-select .tree-select-input {
  width: 100%;
}
.tree-select .tree-select-input .select-option {
  display: none !important;
}
.tree-select-popper {
  max-height: 400px;
  overflow: auto;
}
.tree-select-popper.disabled {
  display: none !important;
}

.el-tree-select-popper[x-placement^='bottom'] {
  margin-top: 5px;
}
>>> .el-tree-node > .el-tree-node__children {
  overflow: visible !important;
}
</style>
